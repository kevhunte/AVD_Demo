const fetch = require('node-fetch')
const assert = require('assert')
const url = 'http://localhost:3000/payments'

describe('Payment Happy Path',() => {
    it('Load Payment Page', async () => {
        const res = await fetch(url)

        assert.strictEqual(res.status, 200, '200 OK not returned for payment page')
    })

    it('Get Creator of Payment', async () => {
        const res = await fetch(url+'/4b16f6c6-c9ec-4e9c-a977-1ab8082739e0')

        assert.strictEqual(res.status, 200, '200 OK not returned from payment endpoint')

        const json = await res.json()

        assert.strictEqual(json.msg.paid_by,'Jacob','Expected name was not returned')
    })

    it('Get Payment Amount', async () => {
        const res = await fetch(url+'/521075c9-ffcf-4faf-81c9-cfacb8ae8ac3')

        assert.strictEqual(res.status, 200, '200 OK not returned from payment endpoint')

        const json = await res.json()

        assert.strictEqual(json.msg.amount, 82.60,'Expected amount was not returned')
    })

    it('Post Payment', async () => {
        const res = await fetch(url,{
            method: 'post',
            body: JSON.stringify({amount: 5, paid_by: 'Tester'}),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 201, 'status code not returned as expected')
        assert.ok(json.msg.length > 0, `Expected uuid but received - ${json.msg}`)
    })

    it('Update Payment', async () => {
        const amount = 5.23
        const res = await fetch(url+'/update_payment/a4b4bbba-bf79-42c5-9fb1-631a1398d3b4',{
            method: 'patch',
            body: JSON.stringify({amount}),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer John` }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 201, 'status code not returned as expected')
        assert.strictEqual(json.msg, `Updated payment from 15.23 to ${amount}`, `Unexpected response returned`)
    })
})

describe('Payments Negative Path',() => {

    it("404 from Get Payment Endpoint", async () => {
        const res = await fetch(url+'/Foo')

        const json = await res.json()

        assert.strictEqual(res.status, 404, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Payment not found`, `Unexpected response returned`)
    })

    it("Missing payment amount", async () => {
        const res = await fetch(url,{
            method: 'post',
            body: JSON.stringify({paid_by: 'Tester'}),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 400, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Failed to post payment. Missing information`, `Unexpected response returned`)
    })

    it("Missing Creator of Payment", async () => {
        const res = await fetch(url,{
            method: 'post',
            body: JSON.stringify({amount: 5}),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 400, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Failed to post payment. Missing information`, `Unexpected response returned`)
    })

    it("Update Payment No Amount", async () => {
        const res = await fetch(url+'/update_payment/034a7c76-2efb-4b3e-9420-a4bd5830b048',{
            method: 'patch',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer Joe" }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 400, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `amount cannot be blank`, `Unexpected response returned`)
    })

    it("Update Payment No Auth Header", async () => {
        const res = await fetch(url+'/update_payment/034a7c76-2efb-4b3e-9420-a4bd5830b048',{
            method: 'patch',
            body: JSON.stringify({amount: 8.00}),
            headers: { 'Content-Type': 'application/json'}
        })

        const json = await res.json()

        assert.strictEqual(res.status, 400, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Missing Token`, `Unexpected response returned`)
    })

    it("Update Payment No Token", async () => {
        const res = await fetch(url+'/update_payment/034a7c76-2efb-4b3e-9420-a4bd5830b048',{
            method: 'patch',
            body: JSON.stringify({amount: 16.00}),
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 401, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Unauthorized`, `Unexpected response returned`)
    })

    it("Update Payment Invalid User", async () => {
        const res = await fetch(url+'/update_payment/034a7c76-2efb-4b3e-9420-a4bd5830b048',{
            method: 'patch',
            body: JSON.stringify({amount: 1.13}),
            headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer Bob" }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 403, '400 response not returned from payment endpoint')
        assert.strictEqual(json.msg, `Action forbidden`, `Unexpected response returned`)
    })
})