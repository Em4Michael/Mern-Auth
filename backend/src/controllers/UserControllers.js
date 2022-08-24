import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import generateTokens from '../utils/generateTokens.js';

//@desc Get user
//@route GET /api/register
//@access Private
const LoginNewUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateTokens(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password.');
    }


});

//@desc Update user
//@route POST /api/register
//@access Private
const registerNewUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userExits = await userModel.findOne({ email });
    if (userExits) {
        res.status(400)
        throw new Error('User already registered.');
    }

    const user = await userModel.create({ firstName, lastName, email, password });


    if (user) {



        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateTokens(user._id),
        });
    } else {
        throw new Error('User not created.');
    }
    res.json({
        firstName,
        lastName,
        email,
    });

});

//@desc Update user
//@route PUT /api/register/:id
//@access Private
const UpdateUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.User.id)
    
     
    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

   /*  if(user.toString() !== user.id){
        res.status(401)
        throw new Error ('User not authorized')
    } */
    
    const UpdateExitingUser = await userModel.findByIdAndUpdate(req.User.id, req.body)

    res.status(200).json(UpdateExitingUser)
})
//@desc Delete user
//@route DELETE /api/register/:id
//@access Private
const DeleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.User.id)
     
    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    await userModel.remove(user)

    res.status(200).json({ id: req.User.id })
})

const getData = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email } = await userModel.findById( req.User.id );

    res.status(200).json({ _id, firstName, lastName, email })
})

export { registerNewUser, LoginNewUser, UpdateUser, DeleteUser, getData };