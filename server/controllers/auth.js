import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTER USER */
export const register = async (req, res) => {
try {
    const {
        firstName,
        lasName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,    
    } = req.body;
    
    const salt =  await bcrypt.genSalt();
    const passworHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lasName,
        email,
        password: passworHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impressions: Math.floor(Math.random() * 1000),
        
    })

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}   catch (err){
    res.status(500).json( { error: err.mess } );

}

}