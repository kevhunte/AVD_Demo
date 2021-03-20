const fetch = require('node-fetch')
const assert = require('assert')
const url = 'http://localhost:3000/login'

describe('Login Happy Path', () => {
    const body = {username: "Alice", password: "password"}
    it('Login as Alice', async () => {
        const res = await fetch(url,{
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 201, 'status code not returned as expected')
        assert.strictEqual(json.msg,'Signed in successfully', `response - ${json}`)
    })

    it('Load login page', async () => {
        const res = await fetch(url)

        assert.strictEqual(res.status, 200, '200 OK not returned for homepage')
    })
    
})

describe('Login Negative Path', () => {
    
    body = {username: "Bob", password: "user"}

    it('Invalid Credentials', async () => {
        const res = await fetch(url,{
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await res.json()

        assert.strictEqual(res.status, 400, 'status code not returned as expected')
        assert.strictEqual(json.msg,'Incorrect username or password', `response - ${json}`)
    })
})