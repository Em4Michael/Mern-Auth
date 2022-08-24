import express from 'express';
import { registerNewUser, LoginNewUser, UpdateUser, DeleteUser, getData} from '../controllers/UserControllers.js';
import protect from '../../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerNewUser)
router.post('/login', LoginNewUser);
router.route('/me').get(protect, getData)
router.route('/:id').put(protect, UpdateUser).delete(protect, DeleteUser)

/* //Read
router.get('/', LoginNewUser);

//create
router.post('/', registerNewUser);

//update
router.put('/:id', UpdateUser);

//delete
router.delete('/:id', DeleteUser); */

/* router.route('/').post(registerUser)
router.route('/logins').post(authUser) */

export default router;