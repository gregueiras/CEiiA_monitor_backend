require('dotenv-load')()
const mongoose = require('mongoose')

const port = process.env.PORT || 4201

const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server, { origins: '*:*' })
const fs = require('fs')

const md5 = require('md5')
const { fakeDataSetup } = require('./fakeData')
const { loadModule, availableModules } = require('./loader')
const { runSimulation } = require('../python/exec')

const clients = {}
const locations = []
let firstTime = true
const cache = {}
let cacheSimulation = {}
const cacheSimulationPath = './src/cache/simulationCache.json'

fakeDataSetup(sendData, clients)
setup()
console.log(locations)

app.get('/simulation', cors(), async function(req, res) {
  console.log('Simulation, ', req.query)

  let simulation
  let index = req.query ? 'default' : JSON.stringify(req.query).replace(/{|}/g, '')

  if (!cacheSimulation[index] || req.query.reCalc) {
    simulation = await runSimulation(35)
    cacheSimulation[index] = simulation
    fs.writeFile(cacheSimulationPath, JSON.stringify(cacheSimulation), err => {
      if (err) console.error(err)
    })
  } else {
    simulation = cacheSimulation[index]
  }

  const { data, image } = simulation

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Display Image</title>
      </head>
      <body>
        <img 
          id='base64image'                 
          src='data:image/png;base64, ${image}'
        />
        <p>${data.replace(/\n/g, '<br/>')}<p/>
      </body>
    </html>
  `)
})

app.get('/', cors(), async function(req, res) {
  console.log(req.query)

  if (req.query.wantedModule) {
    const { wantedModule, wantedType } = req.query

    if (cache[wantedModule] && !wantedType) {
      res.json(cache[wantedModule])
    } else {
      const myMod = await loadModule(wantedModule)
      cache[wantedModule] = myMod

      if (wantedType) {
        const wantedData = myMod.charts.filter(
          ({ type }) => type === wantedType
        )
        if (wantedData.length === 1) {
          res.json(wantedData[0].data)
        } else {
          res.sendStatus(404)
        }
      } else {
        res.json(myMod)
      }
    }
  } else {
    res.json(availableModules())
  }
})

server.listen(port)
console.log('listening on port ', port)

function setup() {
  fs.readFile(cacheSimulationPath, (err, data) => {
    console.log('Loaded simulation cache')
    if (data) cacheSimulation = JSON.parse(data.toString())
  })

  locations.push('S. MiguelO2P')
  locations.push('S. MiguelO2MG')
  locations.push('S. MiguelWT')
  locations.push('TerceiraO2P')
  locations.push('TerceiraO2MG')
  locations.push('TerceiraWT')

  const mode = process.env.NODE_ENV === 'development' ? 'test' : 'buoy'

  const uri = `mongodb+srv://gregueiras:${
    process.env.MONGO_PASS
  }@cluster0-b0rlq.mongodb.net/${mode}?retryWrites=true&w=majority`

  mongoose.connect(uri, {
    useNewUrlParser: true,
  })

  io.on('connection', client => {
    console.log('New client connected')
    locations.forEach(location => handleConnection(client, location))
  })
}

function getSubscriptionName(name) {
  return `update${md5(name)}`
}

function sendData(client, location, value) {
  client && location && client.emit(getSubscriptionName(location), value)
}

function handleConnection(client, location) {
  const subName = getSubscriptionName(location)
  if (firstTime) {
    console.log(`Server listening to "${subName}"`)
    firstTime = false
  }

  client.on(subName, args => {
    console.log(
      `client is subscribing to updates from ${location} with ${args}`
    )
    addClient(location, client)

    client.on('disconnect', function() {
      const index = clients[location].indexOf(client)
      console.log(location, index)
      delete clients[location][index]
      clients[location].splice(index, 1)
    })
  })
}

function addClient(location, client) {
  if (Object.keys(clients).includes(location)) {
    clients[location].push(client)
  } else {
    clients[location] = [client]
  }
}
