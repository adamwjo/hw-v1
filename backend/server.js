//Module Imports
const express = require("express");
const mongoose = require("mongoose");
const CONFIG = require("./config/config.js");
const bodyParser = require('body-parser');
const passport = require('passport');

//Route Imports
const users = require('./routes/api/users.js');



//DB config
const db = CONFIG.MongoDBURI;
mongoose.connect(db)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));



//Start App 
const app = express();


//App BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());



//App Routes
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(CONFIG.PORT, () => console.log(`App is running on port:${CONFIG.PORT}`));