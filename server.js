const express = require("express");
const bodyParser = require("body-parser");
const mangoose = require("mongoose");
var cors = require('cors')
const PORT = process.env.PORT || 5000;
process.env.TZ = 'Asia/Manila'
const app = express();

app.set('port', PORT); 

/** CORS */
app.use(function(req, res, next) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// allow json within request for jwt
app.use(express.json())

app.options('*', cors())

// DB Config
const db = require('./express/config/mongodb.js').mongoURI

// Connect to MongoDB

mangoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connected'))
    .catch(err => console.log('Failed to connect', err))
    
app.get("/", (req, res) => {
    res.json({ message: `Welcome this is a simple node js and mangoodb, @ Port: ${PORT} `  });
});

// api endpoints
require("./express/routes/web-api.js")(app);

app.listen(PORT, () => {
    console.log(`Up and Running ${PORT}.`);
});

