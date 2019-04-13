const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = 8080

app.use(bodyParser.json({ type: "application/json" }))
app.use(cors())
app.options("*", cors())

class DataRepository {
    data = new Map()
    lastId = 0
    insert(item: any) {
        item["id"] = ++this.lastId
        item.lastUpdated = new Date()
        this.data.set(this.lastId, item)
        return this.lastId
    }
    update(item: any) {
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
    find(id: any) {
        return this.data.get(id)
    }
    findAll() {
        return Array.from(this.data.values())
    }
    remove(id: any) {
        if (!this.data.has(id)) {
            return false
        }
        return this.data.delete(id)
    }
}
let plantRepository = new DataRepository()
var plantRouter = express.Router()

plantRouter.get("/", (_req: any, res: any) => {
    res.statusCode = 200
    res.json(plantRepository.findAll())
})

plantRouter.get("/:id", (req: any, res: any) => {
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

plantRouter.post("/", (req: any, res: any) => {
    let lastId = plantRepository.insert(req.body)
    res.statusCode = 201
    res.json(plantRepository.find(lastId))
})

plantRouter.put("/:id", (req: any, res: any) => {
    plantRepository.update(req.body)
    res.statusCode = 202
    res.json(null)
})

plantRouter.delete("/:id", (req: any, res: any) => {
    let id = parseInt(req.params.id, 10)
    plantRepository.remove(id)
    req.statusCode = 200
    res.json(null)
})

app.use("/plant", plantRouter)

app.listen(PORT, () => console.log(`Example api listening on port ${PORT}!`))
