const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const app = express();

require('dotenv').config({path: './config/.env'});
require('./config/db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes

app.use('/api/user', userRoutes);


// Server

app.listen(process.env.PORT, ()=> {
    console.log(`Ecoute du port ${process.env.PORT}`);
})