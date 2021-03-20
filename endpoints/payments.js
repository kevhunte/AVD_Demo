const express = require('express')
const {v4: uuidv4} = require('uuid')
const payments = express()
module.exports = payments;

var payments_db = {
    "76219b21-ab47-49a5-a3e5-e08ffd244a60": { "amount": 5.15, "paid_by": "Jane" },
    "a4b4bbba-bf79-42c5-9fb1-631a1398d3b4": { "amount": 15.23, "paid_by": "John" },
    "4b16f6c6-c9ec-4e9c-a977-1ab8082739e0": { "amount": 7.09, "paid_by": "Jacob" },
    "034a7c76-2efb-4b3e-9420-a4bd5830b048": { "amount": 53.80, "paid_by": "Joe" },
    "521075c9-ffcf-4faf-81c9-cfacb8ae8ac3": { "amount": 82.60, "paid_by": "Bob" }
}

// TODO: auth checker

payments.get('/', (req, res) => {
    res.status(200).send('Get Payments')
})

payments.get('/:id', (req, res) => {
    const id = req.params.id
    let payment = payments_db[id]
    if (!payment) {
        res.status(404).send(`Payment not found`)
    }
    else {
        res.status(200).send(payment)
    }
})

payments.post('/', (req, res) => {
    const amount = req.body.amount
    const paid_by = req.body.paid_by

    if (amount && paid_by) {
        let confirmationNumber = uuidv4()
        res.status(201).send(`Posted Payment: ${confirmationNumber}`)
    }
    else {
        if (!amount && !paid_by) {
            res.status(400).send(`Failed to post payment. Missing information`)
        }
        else if (!amount){
            res.status(400).send(`Failed to post payment. Missing amount`)
        }
        else {
            res.status(400).send(`Failed to post payment. Missing payment individual`)
        }
    }
    
})