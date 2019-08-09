const readline = require('readline')

function inputHandler({name, shift}, sendData, clients) {
  let location, data
  const type = shift ? 'O2C' : 'O2P'
  switch (name) {
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
    console.log(
      Object.keys(clients).map(location => [
        location,
        clients[location].length,
      ])
    )
    break
  }
  default:
    break
  }
  location += type

  if (location && data) {
    const receivingClients = clients[location]
    const newData = JSON.stringify([location, null, data]) //Timestamp, Value

    if (receivingClients) {
      receivingClients.forEach(client => sendData(client, location, newData))
      console.log(`Message Sent to ${location}: ${newData} ${receivingClients.length}x`)
    } else {
      console.log(`No clients for ${location}`)
    }
  }
}

function fakeDataSetup(locations, sendData, clients) {
  locations.push('S. MiguelO2P')
  locations.push('S. MiguelO2C')
  locations.push('HortaO2P')
  locations.push('HortaO2C')

  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (_, key) => inputHandler(key, sendData, clients))
}

module.exports = {
  fakeDataSetup,
}
