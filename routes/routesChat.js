// import functions/modules needed
const express = require('express');
// access schemas created
const User = require('../models/User');

const app  = express();


// signup page
const signup = app.post("/view/signup.html", (req, res) => {
    res.sendFile('signup.html', {root: 'view'})
})

app.get("/view/login.html", (req, res) => {
    res.sendFile('login.html', {root: 'view'})
    const unm = req.body.username;
    const pass = req.body.pass;
    const user = User.findOne({username: unm}, (err, userFound) => {
        if(userFound && bcrypt.compare(pass, user.password)) {
            res.send(userFound);
        } else if (err) {
            res.send(err);
        } else {
            res.send(`No user with username ${unm} was found. Please try again or signup.`);
        }
    })
})

// http://localhost:3000/chat
app.get("/chat", (req, res) => {
    res.sendFile('private_message.html', {root: 'view'})
})

// http://localhost:3000/chat/group
app.get("/chat/group", (req, res) => {
    res.sendFile('group_message.html', {root: 'view'})
})
module.exports = app;