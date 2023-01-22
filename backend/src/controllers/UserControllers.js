import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateTokens from '../utils/generateTokens.js';
import bcrypt from 'bcryptjs';


//@desc Register user
//@route POST /api/user
//@access Public
const registerNewUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(400)
        throw new Error('User already registered.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstName, lastName, email, password: hashedpassword });


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
        throw new Error('Invalid user data');
    }
    res.json({
        firstName,
        lastName,
        email,
    });

});


//@desc Get user
//@route GET /api/user/login
//@access Private
const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
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
//@route Get /api/register/me
//@access Private
//const GetMe = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.User.id)
    
     
//     if (!user) {
//         res.status(401)
//         throw new Error ('User not found')
//     }

//    /*  if(user.toString() !== user.id){
//         res.status(401)
//         throw new Error ('User not authorized')
//     } */
    
//     const UpdateExitingUser = await User.findByIdAndUpdate(req.User.id, req.body)

   // res.status(200).json({message: 'User data display'})
//})
//@desc Delete user
//@route DELETE /api/register/:id
//@access Private
const DeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.User.id)
     
    if (!user) {
        res.status(401)
        throw new Error ('User not found')
    }

    await User.remove(user)

    res.status(200).json({ id: req.User.id })
})

const GetMe = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email } = await User.findById( req.User.id );

    res.status(200).json({ _id, firstName, lastName, email })
})

export { registerNewUser, LoginUser, GetMe, DeleteUser };