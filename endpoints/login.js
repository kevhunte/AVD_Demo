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
            res.status(201).json({msg: `Signed in successfully`})
        }
        else {
            res.status(400).json({msg: `Incorrect username or password`})
        }
        
    }
    else {
        res.status(400).json({msg: `Missing username or password`})
    }
    
})