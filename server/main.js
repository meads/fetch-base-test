const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = 8080

app.use(bodyParser.json({ type: "application/json" }))
app.use(cors())
app.options("*", cors())

function DataRepository() {
    this.data = new Map()
    this.lastId = 0

    return this
}
DataRepository.prototype.insert = function(item) {
    item["id"] = ++this.lastId
    item.lastUpdated = new Date()
    this.data.set(this.lastId, item)
    return this.lastId
}
DataRepository.prototype.update = function(item) {
    if (!("id" in item)) {
        this.insert(item) // not checking for duplication here so...
    }
    if (!this.data.has(item.id)) {
        return false
    }
    let el = this.data.get(item.id)
    for (let k of Object.keys(item)) {
        if (k == "id") continue
        el[k] = item[k]
    }
    el.lastUpdated = new Date()
    this.data.set(el.id, el)
    return true
}
DataRepository.prototype.find = function(id) {
    return this.data.get(id)
}
DataRepository.prototype.findAll = function() {
    return Array.from(this.data.values())
}
DataRepository.prototype.remove = function(id) {
    if (!this.data.has(id)) {
        return false
    }
    return this.data.delete(id)
}

let plantRepository = new DataRepository()
var plantRouter = express.Router()

plantRouter.get("/", function(req, res) {
    res.statusCode = 200
    res.json(plantRepository.findAll())
})

plantRouter.get("/:id", function(req, res) {
    let id = parseInt(req.params.id, 10)
    let plant = plantRepository.find(id)
    if (!plant) {
        res.statusCode = 404
        res.json({ errors: ["Plant not found"] })
    } else {
        res.statusCode = 200
        res.json(plant)
    }
})

plantRouter.post("/", function(req, res) {
    let lastId = plantRepository.insert(req.body)
    res.statusCode = 201
    res.json(plantRepository.find(lastId))
})

plantRouter.put("/:id", function(req, res) {
    plantRepository.update(req.body)
    res.statusCode = 202
    res.json(null)
})

plantRouter.delete("/:id", function(req, res) {
    let id = parseInt(req.params.id, 10)
    plantRepository.remove(id)
    req.statusCode = 200
    res.json(null)
})

app.use("/plant", plantRouter)

app.listen(PORT, () => console.log(`Example api listening on port ${PORT}!`))
