import mongoose from 'mongoose';

const goalSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{timestamps: true});

const Goals = mongoose.model('Goals', goalSchema);

export default Goals;
