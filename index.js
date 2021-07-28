const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const app = express();

require('dotenv').config({path: './config/.env'});
require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {res.status(200).send(res.locals.user._id)});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Server
app.listen(process.env.PORT, ()=> {
    console.log(`Ecoute du port ${process.env.PORT}`);
})