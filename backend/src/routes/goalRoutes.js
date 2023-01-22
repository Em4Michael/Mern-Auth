import express from 'express';
import { getGoals, setGoals, UpdateGoals, deleteGoals } from '../controllers/GoalControllers.js';
import protect from '../../middlewares/authMiddleware.js'

const router = express.Router();

// router.route('/register').post(registerNewUser)
// router.post('/login', LoginNewUser);
// router.route('/me').get(protect, getData)
// router.route('/:id').put(protect, UpdateUser).delete(protect, DeleteUser)

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').put(protect, UpdateGoals).delete(protect, deleteGoals)
 
// router.get('/', getGoals);

// router.post('/', setGoals);

// router.put('/:id', UpdateGoals);

// router.delete('/:id', deleteGoals);

export default router;