//export GOOGLE_APPLICATION_CREDENTIALS="./apikey.json"

require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const session = require("express-session");
const bodyParser=require('body-parser');
const ocr=require('./routes/ocr.js');
const socket = require("socket.io");
//const secret = require("./secret")
const app=express();


app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:false,
    resave:false
}));
app.set("view engine","ejs");
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/',(req,res,next)=>{
    res.render("index")
});

app.get('/test',(req,res,next)=>{

    res.render('vr',{text:"Sample test text",analysis:"Joy"});

});

// app.get("/docs",(req,res,next)=>{
//     res.sendFile(`${__dirname}/docs/index.html`);
// })


app.use('/ocr',ocr);




app.use(function(err,req,res,next){
    console.log(err.message);

});

let server = app.listen(3000,function(err,result){
  console.log("Connected to server ");
});

let io = socket(server);

app.socket = io;