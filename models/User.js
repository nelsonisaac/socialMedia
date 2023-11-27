import mongoose from "mongoose";

// We need to create a schema in order to save the details in the mongoDB 
// All these are the required fields that we are defining for the userSchema to store them in the DB
// We use this schema and create a model, which is required by the DB to accept the data
// By using this schema, we take the input data from the user, create a newUser model    ( const newUser = new User({fname: ,lname: ,...})) which only accepts data in this below format and save all the details in that newUser object
const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        lastName:{
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        email:{
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        paswword:{
            type: String,
            require: true,
            min: 5,
        },
        picturePath:{
            type: String,
            default: "",
        },
        friends:{
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },{
        timestamps: true
    }
);

// We create User model and name it User.
const User = mongoose.model("User", UserSchema);
export default User;