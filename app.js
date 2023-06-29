//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose'); 

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));



const uri = "mongodb+srv://nateewing93:Travelin.20@cluster0.cxhnnxh.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to mongoDB though Atlas.")
    } catch (error) {
        console.log(error)
    }
}
connect()




app.get("/", (req, res)=> {
    res.render("home")
});

app.get("/login", (req, res)=> {
    res.render("login")
});

app.get("/register", (req, res)=> {
    res.render('register')
});



app.listen(3000, () => {
    console.log("app listening on port 3000.")
});