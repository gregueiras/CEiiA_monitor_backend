const PYTHON_PATH = '../temp/Boia'
const { exec } = require('child_process')
const fileName = 'buoy.py'
const fs = require('fs')

function runSimulation(
  latitude = 38,
  longitude = 12,
  randomLowerBound = -0.3,
  randomUpperBond = 0.3,
  area = true,
  radius = 5
) {
  return new Promise(resolve => {
    const cmd = `cd ${PYTHON_PATH} && pipenv run python ${fileName} ${latitude} ${longitude} ${randomLowerBound} ${randomUpperBond} ${area} ${radius}`
    const childProcess = exec(cmd, (err, dataReceived, stderr) => {
      const [data, image] = dataReceived.split('___IMAGE___')

      fs.writeFile('out.png', image, 'base64', function(err) {
        if (err) console.log(err)
      })
      fs.writeFile('log.txt', data, 'utf8', function(err) {
        if (err) console.log(err)
      })
      resolve({ data, image })
    })

    childProcess.on('close', function(code) {
      process.stdout.write('python finished with code ' + code + '\n')
    })
  })
}

module.exports = { runSimulation }
