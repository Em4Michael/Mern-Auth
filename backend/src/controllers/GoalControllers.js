import asyncHandler from 'express-async-handler';
import Goals from '../models/goalModels.js';
import User from '../models/userModel.js';


//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {

    const goal = await Goals.find({ user: req.User.id });

    res.status(200).json(goal)
})

//@desc Set Goals
//@route GET /api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error ('Please add a text feild')
    }

    const goal = await Goals.create({ text: req.body.text, user: req.User.id });

    res.status(200).json(goal)
})

//@desc UpdateGoals Goals
//@route UpdateGoals /api/goals/:id
//@access Private
const UpdateGoals = asyncHandler(async (req, res) => {
    
    const goal = await Goals.findById(req.params.id)
    if (!goal) {
        res.status(401)
        throw new Error ('Goal not found')
    }

    const user = await User.findById(req.User.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error ('user not found') 
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not found')
    }

    const UpdatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(UpdatedGoal)

    //res.status(200).json({message: `Update goals ${req.params.id}`})
})

//@desc deleteGoals Goals
//@route deleteGoals /api/goals/:id
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goals.findById(req.params.id)
     
     
    if (!goal) {
        res.status(401)
        throw new Error ('Goal not found')
    }
    const user = await User.findById(req.User.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error ('user not found') 
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not found')
    }

    await Goals.remove({ text: req.body.text, user: req.User.id })
    res.status(200).json({id: req.params.id})

    //res.status(200).json({message: `Delete goals ${req.params.id}`})
})

export { getGoals, setGoals, UpdateGoals, deleteGoals };