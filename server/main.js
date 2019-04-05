const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8080

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors())
app.options('*', cors());

function DataRepository() {
    this.data = new Map()
    this.lastId = 0

    return this
}
DataRepository.prototype.insert = function(item) {
    item["id"] = (++this.lastId)
    item.lastUpdated = new Date()
    this.data.set(this.lastId, item)
    return this.lastId
}
DataRepository.prototype.update = function(item) {
    if (!("id" in item)) {
        throw new Error("no id field on item to update")
    }
    if (!this.data.has(item.id)) {
        return false
    }
    let el = this.data.get(item.id) 
    el.lastUpdated = new Date()
    el.genus = item.genus
    el.species = item.species
    el.commonName = item.commonName
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
function lookupPlant(req, res, next) {
    try {
        let id = parseInt(req.params.id, 10)
        let plant = req.params.id ? 
            plantRepository.find(id) : 
            plantRepository.findAll();
        if (!plant) {
            res.statusCode = 404
            res.json({ errors: ['Plant not found']})
        }
        res.statusCode = 200
        req.plant = plant
        next()
    } catch (e) {
        console.error(e)
        res.statusCode = 500    
        res.json({ errors: ['Failed to fetch plant', e]})
    }
}
var plantRouter = express.Router();

plantRouter.get('/', lookupPlant, function(req, res) { 
    return res.json(req.plant); 
})

plantRouter.post('/', function(req, res) {
    let lastId = plantRepository.insert(req.body)
    res.statusCode = 201
    return res.json(plantRepository.find(lastId))
});

plantRouter.get('/:id', lookupPlant, function(req, res) {
    return res.json(req.plant)
});

plantRouter.put('/:id', function(req, res) {
    let status = 404
    if (plantRepository.update(req.body)) {
        status = 200
    }
    res.statusCode = status
    return res.json({updated: status == 200, time: new Date()})
});

plantRouter.delete('/:id', function(req, res) {
    req.statusCode = 200
    plantRepository.remove(req.params.id)
    return res.json({deleted: true})
});

app.use('/plant', plantRouter)

app.listen(PORT, () => console.log(`Example api listening on port ${PORT}!`))
