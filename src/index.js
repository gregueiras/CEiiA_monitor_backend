const io = require('socket.io')()
const md5 = require('md5')
const { fakeDataSetup } = require('./fakeData')

const clients = {}
const port = 3333
const locations = []

fakeDataSetup(locations, sendData, clients)
console.log(locations)
setup()

io.listen(port)
console.log('listening on port ', port)

function setup() {
  io.on('connection', client => {
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
  console.log(`Server listening to "${subName}"`)
  client.on(subName, () => {
    console.log(`client is subscribing to updates from ${location}`)
    addClient(location, client)
  })
}

function addClient(location, client) {
  if (Object.keys(clients).includes(location)) {
    clients[location].push(client)
  } else {
    clients[location] = [client]
  }
}
