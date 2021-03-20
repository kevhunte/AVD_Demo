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

    if (password && username) {

        if(username == user.username && password == user.password){
            res.status(201).send(`Signed in successfully`)
        }
        else {
            res.status(400).send(`Incorrect username or password`)
        }
        
    }
    else {
        if (!username && !password) {
            res.status(400).send(`Missing username and password`)
        }
        else if (!username){
            res.status(400).send(`Missing username`)
        }
        else {
            res.status(400).send(`missing password`)
        }
    }
    
})