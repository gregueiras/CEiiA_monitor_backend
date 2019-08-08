const readline = require('readline')

function inputHandler(keyPressed, sendData, clients) {
  let location, data
  switch (keyPressed) {
  case 'q': {
    location = 'S. Miguel'
    data = 8
    break
  }
  case 'a': {
    location = 'S. Miguel'
    data = 5
    break
  }
  case 'z': {
    location = 'S. Miguel'
    data = 2
    break
  }
  case 'w': {
    location = 'Horta'
    data = 8
    break
  }
  case 's': {
    location = 'Horta'
    data = 5
    break
  }
  case 'x': {
    location = 'Horta'
    data = 2
    break
  }
  case 'c': {
    process.exit()
    break
  }

  case 'd': {
    console.log(  Object.keys(clients).map(location => [location, clients[location].length]))
    break
  }
  default:
    break
  }
  if (location && data) {
    const receivingClients = clients[location]
    const newData = JSON.stringify([null, data]) //Timestamp, Value
    
    receivingClients && receivingClients.forEach(client => sendData(client, location, newData))
    if (receivingClients)
      console.log(`Message Sent: ${newData} ${receivingClients.length}x`)
  }
}

function fakeDataSetup(locations, sendData, clients) {
  locations.push('S. Miguel')
  locations.push('Horta')

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', keyPressed =>
    inputHandler(keyPressed, sendData, clients)
  )
}

module.exports = {
  fakeDataSetup,
}
