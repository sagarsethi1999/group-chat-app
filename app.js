const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    fs.readFile('username.txt', 'utf8' ,(err, data) => {
        if (err) {
            console.log(err);
            data = "no chat exists";
        }
        
        res.send(
            `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')" >
             <input type="text"  name="message" id="message">
             <input type="hidden"  name="username" id="username">
            <br>
            <button type="submit">send</button>
            </form>`
        );
    });
});

app.post("/", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);

    fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`, { flag: 'a' }, (err) => err ? console.log(err) : res.redirect("/"));
});

app.get("/login", (req, res) => {
    res.send(
        `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST">
            <input id="username" type="text" name="username" placeholder="username">
            <button type="submit">add</button>
        </form>`
    );
});

// Handle POST requests for the "/login" route
app.post("/login", (req, res) => {
    // Handle the login logic here if needed
    // just redirect to the home page
    res.redirect("/");
});

app.listen(4000);




