import { PlantRepository } from "../../lib/dist"
import express = require("express")
import bodyParser = require("body-parser")
import cors = require("cors")

const app: express.Application = express()
const PORT = 8080

app.use(bodyParser.json({ type: "application/json" }))
app.use(cors())
app.options("*", cors())

let plantRepository = new PlantRepository()
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
