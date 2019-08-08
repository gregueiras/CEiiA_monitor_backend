const io = require("socket.io")();
const readline = require("readline");

const port = 3333;
const eventName = "updateO2"

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const handleInput = (client, keyPressed) => {
  sendData(client)
  if (keyPressed === "c") {
    process.exit();
  }
};

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    process.stdin.on("keypress", (keyPressed) => handleInput(client, keyPressed));
  });
});

function sendData(client) {
  client && client.emit("timer", 6);
}

io.listen(port);
console.log("listening on port ", port);
