const express = require('express');
const app = express();
const connection = require('./connection');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

connection;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors({origin: 'http://localhost:3006', credentials: true }))
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


module.exports = app;