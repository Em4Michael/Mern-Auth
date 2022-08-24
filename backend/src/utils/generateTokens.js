import jwt from 'jsonwebtoken';
import UserToken from '../models/UserToken.js';

const generateTokens = (id) => {

    return jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: '14d'
    });
  /*    try {
        const payload = {_id: user._id, role: user.role};

        const accesstoken = jwt.sign(payload, process.env.ACCESS_JWT_SECRET, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET, {
            expiresIn: '7d'
        });

        const userToken = await UserToken.findOne({userId: user._id});
        if (userToken) await UserToken.remove()

        await new UserToken({ userId: user._id, refreshToken }).save();
        return Promise.resolve({accesstoken, refreshToken});
       
    }
    catch (error) {
        return Promise.reject(error);
    }  */
}

export default generateTokens; 