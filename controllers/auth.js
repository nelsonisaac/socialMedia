import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/** REGISTER USER */

//We are taking the typed values by user, which are the in the req paramter and giving names to each of the field typed like firstName,lastName
//this is mapping the front end typed details to the various fields like firstName,lastName which are present in the req.body
export const register = async(req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        //among the values that we got, we specifically, took the password key and hashed it using the bcrypt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // We are now creating a new user by taking the model from the user schema model and saving all the field values firstName,lastName that we took from the req.body above and saving it in the newUser model
        // We even add new fields which are missing in the above fields, so that it should match the userSchema model.
        // With this newUser we store the details in the MongoDB using the save function

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000),
        });

        // Saving the above user details in the MongoDB 
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
         res.status(500).json({error: err.message});
    }
}