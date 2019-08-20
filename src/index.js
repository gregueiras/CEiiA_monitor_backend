require('dotenv-load')()
const mongoose = require('mongoose')

const port = process.env.PORT || 4201

const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server, { origins: '*:*' })

const md5 = require('md5')
const { fakeDataSetup } = require('./fakeData')
const { loadModule, availableModules } = require('./loader')

const clients = {}
const locations = []
let firstTime = true
const cache = {}

fakeDataSetup(locations, sendData, clients)
console.log(locations)
setup()

app.get('/', cors(), async function(req, res) {
  console.log(req.query)

  if (req.query.wantedModule) {
    const { wantedModule } = req.query

    if (cache[wantedModule]) {
      res.json(cache[wantedModule])
    } else {
      const myMod = await loadModule(wantedModule)
      cache[wantedModule] = myMod
      res.json(myMod)
    }
  } else {
    res.json(availableModules())
  }
})

server.listen(port)
console.log('listening on port ', port)

function setup() {
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
