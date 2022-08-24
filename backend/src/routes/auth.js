import express from 'express';

import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateTokens from '../utils/generateTokens.js';
import {logInBodyValidation, singUpBodyValidation} from '../utils/validationSchema.js';

 
import Joi from 'joi';

const router = express.Router(); 

router.post('/singUp', async (req, res) => {
    try {
        const {error} = singUpBodyValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send('User already registered.');
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        res.status(201).json({message: 'User created successfully.'});

       /*  const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET);
        res.header('auth-token', token).send(token); */
    } catch (error) {
        res.status(500).json({error: true, message:'Internal server error'});
    }

   

})

router.post('/logIn', async (req, res) => {
    try {
        const {error} = logInBodyValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);
        
        const user = await User.findOne({email: req.body.email});
        if (!user) 
            return res
                .status(400)
                .json({message: 'Invalid email or password.'});

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid)
            return res
                .status(400)
                .json({message: 'Invalid email or password.'});
        const {token, refreshToken} = await generateTokens(user);
        res.status(200).json({message: 'Logged in successfully.', token, refreshToken});

     
    } catch (error) {
        res.status(500).json({error: true, message:'Internal server error'});
    }
} );



export default router;