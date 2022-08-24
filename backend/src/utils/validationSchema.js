import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';


 const singUpBodyValidation = (body) => {

    const schema = {
        firstName: Joi.string().min(3).max(250).required(),
        lastName: Joi.string().min(3).max(250).required(),
        email: Joi.string().min(3).max(20).required().email(),
        password: Joi.string().min(6).max(25).required(),
        role: Joi.string().min(3).max(25).required()
    };
    return Joi.validate(body, schema);
};

const logInBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(20).required().email(),
        password: Joi.string().min(6).max(25).required()
    });
    return Joi.validate(body, schema);
};

export { singUpBodyValidation, logInBodyValidation }