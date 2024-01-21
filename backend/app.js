const express = require('express');
const app = express();
const connection = require('./connection');
const func  = require('./function');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

connection;

// Associations

const User = require('./models/User');
const Service = require('./models/Service');

func.belongsTo(User, Service, 'serviceId')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors({origin: 'http://localhost:4200', credentials: true }))
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/service');
const thematicRoutes = require('./routes/thematic');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/thematic', thematicRoutes);

module.exports = app;