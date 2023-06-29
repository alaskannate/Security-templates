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



const uri = "mongodb+srv://nateewing93:Travelin.20@cluster0.cxhnnxh.mongodb.net/userDB?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to mongoDB though Atlas.")
    } catch (error) {
        console.log(error)
    }
}
connect()


const userSchema = {
    email: String,
    password: String,
};

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.render("home")
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/register", (req, res) => {
    res.render('register')
});

app.get("/submit", (req, res) => {
    
});

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save()
        .then(() => {
            res.render('secrets');
        })
        .catch(error => {
            console.log(error);
        });
});

app.post("/login", (req, res) => {

    const userName = req.body.email;
    const password = req.body.password;

    User.findOne({
            username: userName
        })
        .then(user => {
            if (!user) {
                res.send('User not found');
            } else if (password === user.password) {
                res.render('secrets');
            } else {
                res.send('Incorrect password')
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred")
        });

});


app.listen(3000, () => {
    console.log("app listening on port 3000.")
});