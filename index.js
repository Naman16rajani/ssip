const express = require('express');
const bodyParser = require("body-parser");


// import { v4 as uuidv4 } from 'uuid';
const uuid = require('uuid');
const v4=uuid.v4;
const app =express();
app.use(bodyParser.json())

app.set('view engine','ejs');
var mysql      = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'ssip'
})


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));
app.get('/',(req, res)=>{
    res.render('index');
});
app.get('/sign_doc',(req, res)=>{
    res.render('sign_doc/sign_doc');
});
app.get('/sign_pat',(req, res)=>{
    res.render('sign_pat/sign_pat');
});
app.post('/signup_pat',(req, res)=>{
    console.log(req.body.Name);
    var id = v4();
    pool.getConnection((err, connection) => {
        if(err) throw err
        const params = req.body
        params["id"]=id;
        console.log('connected as id ' + connection.threadId)
        connection.query("INSERT INTO patient SET ?",params, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                console.log(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
    // connection.query("insert into `patient` Values ($id,$(req.body.Name),$(req.body.Email),$(req.body.Password));");
    // connection.end();
res.redirect("/");
})
app.post('/signin_pat',(req, res)=>{
    console.log(req.body.Name);
    pool.getConnection((err, connection) => {
        if(err) throw err
        const params = req.body
        console.log('connected as id ' + connection.threadId)
        connection.query("SELECT * FROM patient WHERE Name=? And Password=?",[params.Name,params.Password], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                // console.log(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
            // if(rows.>0){
            //     console.log("login")
            // }
        })
    })
    // connection.query("insert into `patient` Values ($id,$(req.body.Name),$(req.body.Email),$(req.body.Password));");
    // connection.end();
    res.redirect("/");
})

app.post('/signup_doc',(req, res)=>{
    console.log(req.body.Name);
    var id = v4();
    pool.getConnection((err, connection) => {
        if(err) throw err
        const params = req.body
        params["id"]=id;
        console.log('connected as id ' + connection.threadId)
        connection.query("INSERT INTO doctor SET ?",params, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                console.log(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
    // connection.query("insert into `patient` Values ($id,$(req.body.Name),$(req.body.Email),$(req.body.Password));");
    // connection.end();
    res.redirect("/");
})
app.post('/signin_doc',(req, res)=>{
    console.log(req.body.Name);
    pool.getConnection((err, connection) => {
        if(err) throw err
        const params = req.body
        console.log('connected as id ' + connection.threadId)
        connection.query("SELECT * FROM doctor WHERE Name=? And Password=?",[params.Name,params.Password], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                // console.log(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
            // if(rows.>0){
            //     console.log("login")
            // }
        })
    })
    // connection.query("insert into `patient` Values ($id,$(req.body.Name),$(req.body.Email),$(req.body.Password));");
    // connection.end();
    res.redirect("/");
})


app.listen(3000,()=>{
    console.log("server start");
});

