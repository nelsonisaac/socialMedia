import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

/** CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan());
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));

/**FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'publis/assets');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage});

/**ROUTES WITH FILES */
app.post("auth/register", upload.single('picture'), register);

/**ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/**MONGOOSE SETUP */
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`server port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

