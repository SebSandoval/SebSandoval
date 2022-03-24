const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({
        msg: "get"
    })
})

app.post('/', (req, res) => {
    res.json({
        msg: "post"
    })
})


app.put('/', (req, res) => {
    res.json({
        msg: "put"
    })
})

app.delete('/', (req, res) => {
    res.status(202).json({
        msg: "delete"
    })
})




app.listen()
console.log("hola mundo")