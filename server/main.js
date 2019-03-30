const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080

var apiRouter = express.Router()
apiRouter.route('/')
.get((req, res) => {
    res.send([
        { commonName: "southern magnolia", genus: "magnolia", species: "grandifloria" },
        { commonName: "banana shrub", genus: "magnolia", species: "fuscata" },
    ])
})

app.use(cors())
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Example api listening on port ${PORT}!`))