/* const express = require('express'); */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors'
import user from './data/users.js';
import auth from './routes/auth.js';

import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js'
import { notFound, errorHandler } from '../middlewares/errorMiddleware.js';

// Connect to database
dotenv.config()
connectDB()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.send('Hello World');
    res.status(200).res.json({
        message: 'Hello World'
    });

});


app.use('/api/user', userRoutes)
app.use('/api/goals', goalRoutes)



/*
app.get('/api/users', (req, res) => {
    res.json(user);
})
 */
//app.get('/api/users/:id', (req, res) => {
/*  const { id } = req.params; */
//  const User = user.find((n) => n._id === req.params.id);
/* if (!user) return res.status(404).send('The user with given ID was not found.'); */
//res.send(User);
//});


/* app.use('/api', auth);

app.use('/api/signins', userRoutes); */

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
