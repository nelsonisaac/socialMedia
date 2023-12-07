import jwt from "jsonwebtoken";

// When user logins for the first time a token is sent by the server using the JWT_SECRET key that the user has given. Now with this token user can next time access without any signin , the server checks the token if it's the same token one which the server sent when the user logged in for the first time. If it matches the server gives the access.

export const verifyToken = async (req,res) =>{
    try {
        // Taking the token from the front-end when user is trying to access for the second time

        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access denied");
        }

        //the token consists of "Bearer bcubdcbwicb.." so we trim off the Bearer and the space and only take the token part which is on the right
        if(token.startswith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        // the token from the front end is verified with the token with the token sent by the server using the JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}