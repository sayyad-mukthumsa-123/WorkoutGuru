const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (e.g. cookies) to be sent with the request
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.path, req.method);
    next();
});

// API routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`connected to db and listening to port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

app.get('/', (req, res) => {
    res.json({ message: 'welcome to app' });
});
