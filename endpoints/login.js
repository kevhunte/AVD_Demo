const express = require('express')
const login = express()
module.exports = login;

const user = {
    username : "Alice",
    password : "password"
}

login.get('/', (req, res) => {
    res.status(200).send('Login page')
})

login.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (typeof password !== 'undefined' && typeof username !== 'undefined') {

        if(username == user.username && password == user.password){
            res.status(201).send(`Signed in successfully`)
        }
        else {
            res.status(400).send(`Incorrect username or password`)
        }
        
    }
    else {
        res.status(400).send(`Missing username or password`)
    }
    
})