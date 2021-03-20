const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const payments = require('./endpoints/payments')


app.use('/payments', payments)

app.get('/', (req, res) => {
    res.send('Automated Vulnerability Detection')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})