import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30, 
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'super_admin'],
        default: 'user'
    },
},
{timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
         next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}
);

userSchema.methods.matchPassword = async function(newPassword) {
    return await bcrypt.compare(newPassword, this.password);
}

/* userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    }
); */

const User = mongoose.model('user', userSchema);

export default User;