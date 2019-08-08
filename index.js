const io = require("socket.io")()
const readline = require("readline")
const md5 = require("md5")
const reverseMd5 = require("reverse-md5")

const port = 3333

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const handleInput = (client, location, wantedData, keyPressed) => {
  if (keyPressed === "c") {
    process.exit()
  } else if (keyPressed === "a") {
    if (JSON.parse(wantedData).includes("O2P")) {
      sendData(client, location, 4)
    }
  } else if (keyPressed === "s") {
    if (JSON.parse(wantedData).includes("O2C")) {
      sendData(client, location, 6)
    }
  }
}

const locations = ["S. Miguel", "Horta"]
function getSubscriptionName(name) {
  return `update${md5(name)}`
}

io.on("connection", client => {
  locations.forEach(location => handleConnection(client, location))
})

function handleConnection(client, location) {
  client.on(getSubscriptionName(location), wantedData => {
    console.log(
      `client is subscribing to updates from ${location} of ${wantedData}`
    )
    process.stdin.on("keypress", keyPressed =>
      handleInput(client, location, wantedData, keyPressed)
    )
  })
}

function sendData(client, location, value) {
  client && client.emit(getSubscriptionName(location), value)
}

io.listen(port)
console.log("listening on port ", port)
