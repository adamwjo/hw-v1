//Module Imports
const express = require("express");
const mongoose = require("mongoose");
const CONFIG = require("./config.js");

//Route Imports
const users = require('./routes/api/users.js');






//DB config
const db = CONFIG.MongoDBURI;
mongoose.connect(db)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));




//Start app 
const app = express();





//App Routes
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(CONFIG.PORT, () => console.log(`App is running on port:${CONFIG.PORT}`));