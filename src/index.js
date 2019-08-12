require('dotenv').config()
const io = require('socket.io')()
const express = require('express')
const cors = require('cors')
const md5 = require('md5')
const { fakeDataSetup } = require('./fakeData')
const { loadModule, availableModules } = require('./loader')

const clients = {}
const port = 3333
const locations = []
let firstTime = true

fakeDataSetup(locations, sendData, clients)
console.log(locations)
setup()
io.listen(port)
console.log('listening on port ', port)
 
const app = express()
app.use(cors())
app.get('/', function(req, res) {
  console.log(req.query)
  
  if (req.query.wantedModule) {
    const { wantedModule } = req.query
    res.json(loadModule(wantedModule))
  } else {
    res.json(availableModules())
  }
})
app.listen(3334)

function setup() {
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
