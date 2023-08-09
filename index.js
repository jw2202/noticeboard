const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
    host: 'db.teamlog.kr',
    user: 'admin',
    password: 'teamlog2023!',
    database: 'jinwoo'
});

connection.connect();

app.set("view engine", "ejs");

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    connection.query(`insert into infor (username, password) values('${username}', '${password}')`, (error) => {
        if(error)
            console.log(error);
        res.send("success!");
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res){
    const {username, password} = req.body;
    
    connection.query(`SELECT * FROM infor WHERE username='${username}' AND password='${password}'`, function(error, data){
        if(error)
            console.log(error);
        if(!Object.keys(data).length) res.render('fail-login');
        else res.render('success-login',{username});
    });
});

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});