const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PWD + '@cluster0.9wt9d.mongodb.net/socialnetwork', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.log('Echec de la connexion à MongoDB', err))