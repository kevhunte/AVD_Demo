const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const payments = require('./endpoints/payments')
const login = require('./endpoints/login')

app.use(express.json())
app.use('/payments', payments)
app.use('/login', login)

app.get('/', (req, res) => {
    res.send('Automated Vulnerability Detection Demo')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})