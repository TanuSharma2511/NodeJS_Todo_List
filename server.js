if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

var express=require("express");
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app=express();

//Connectivity to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'));

app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(3001,() =>{
    console.log("Server Connected");
})
module.exports = app;