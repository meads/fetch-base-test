const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080


class Automobile {
    constructor(
        make = "",
        model = "",
    ){}
}

class Car extends Automobile {
    constructor(
        make = "",
        model = "",
        hybrid = false,
    ){
        super(make, model)
    }
}

// add cors middleware
app.use(cors())

app.get('/', (req, res) => {
    debugger
    res.send([
        { make: "toyota", model: "corolla", hybrid: false },
        { make: "toyota", model: "prius", hybrid: true },
    ])
})
// app.put('/:thing', (req, res) => {
//     debugger
// })

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))