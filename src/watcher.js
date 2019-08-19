const sane = require('sane')
const readLastLines = require('read-last-lines')
const fs = require('fs')
const sizes = []
const path = 'src/data/live'

async function setupWatcher(sendData, clients) {
  const watcher = sane(path, { glob: ['**/*.txt'] })
  watcher.on('ready', () => {
    console.log('watcher ready')
    fs.readdirSync(path).forEach(async file => {
      const filePath = `${path}/${file}`
      const lines = await countLines(filePath) + 1
      console.log(file, lines)
      sizes[`${file}`] = lines
    })
  })

  watcher.on('change', async (event, path) => {
    try {
      const filePath = `${path}/${event}`
      const prevLines = sizes[`${event}`]
      const newLines = await countLines(filePath) + 1

      const linesToRead = newLines - prevLines
      console.log(`New Lines: ${linesToRead}\tTotal Lines: ${newLines} `)
      sizes[`${event}`] = newLines

      if (linesToRead < 1) return

      const lines = await readLastLines.read(filePath, linesToRead + 1)
      console.log(lines)
      const linesArr = lines
        .replace(/\r?\n|\r/g, '')
        .split('{')
        .filter(string => string.length != 0)
        .map(string => JSON.parse('{' + string))
      console.log(linesArr)

      linesArr.forEach(data => {
        function prepareData({ date, buoy = 'B4712', value }) {
          let time

          try {
            const regex = /(\d{2})\/(\d{2})\/(\d{2}) - (\d{2}):(\d{2}):(\d{2})/
            const parts = date.match(regex)
            time = Date.UTC(
              2000 + +parts[3],
              parts[2] - 1,
              +parts[1],
              +parts[4],
              +parts[5],
              +parts[6]
            )
          } catch (err) {
            time = null
          }

          return [buoy, time, value]
        }

        const buoyLocation = data.location || 'Terceira'
        const buoyType = data.type.toUpperCase() || 'O2P'

        const location = buoyLocation + buoyType
        const receivingClients = clients[location]
        const msg = prepareData(data)

        if (receivingClients) {
          receivingClients.forEach(client =>
            sendData(client, location, JSON.stringify(msg))
          )
          console.log(
            `Message Sent to ${location}: ${msg} ${receivingClients.length}x`
          )
        }
      })
    } catch (err) {
      console.error(err)
    }
  })
  watcher.on('add', (event, path, details) => console.log(event, path, details))
}

function countLines(path) {
  return new Promise((resolve, reject) => {
    var i
    var count = 0
    require('fs')
      .createReadStream(path)
      .on('data', function(chunk) {
        for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++
      })
      .on('end', function() {
        resolve(count)
      })
      .on('error', reject)
  })
}

module.exports = setupWatcher
