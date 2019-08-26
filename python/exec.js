const PYTHON_PATH = '../temp/Boia'
const { exec } = require('child_process')
const fileName = 'buoy.py'
const fs = require('fs')

function escape(str) {
  let string = str
  if (!(str instanceof String)) string = JSON.stringify(str)

  return string
    .replace(/\[/g, '\\[')
    .replace(/]/g, '\\]')
    .replace(/ /g, '')
    .replace(/"/g, '')
}

function runSimulation(
  latitude = 38,
  longitude = 12,
  randomLowerBound = -0.3,
  randomUpperBond = 0.3,
  area = true,
  radius = 5,
  time_jumps = '[0.0625, 5.78703704e-5, 5.78703704e-5, 5.78703704e-5, 5.78703704e-5, 5.78703704e-5, 5.78703704e-5, 0.000694444444, 0.0625]',
  time_steps = '[4, 1, 1, 1, 1, 1, 1, 10, 3]',
  turns = '[0.523333333,0.523333333,0.523333333,0.523333333,0.523333333,0.523333333,0,0]',
  velocity = '[0,2,2,2,2,2,2,2,2,2,2,2,0]'
) {
  return new Promise(resolve => {
    const cmd = `cd ${PYTHON_PATH} && pipenv run python ${fileName} ${latitude} ${longitude} ${randomLowerBound} ${randomUpperBond} ${area} ${radius} ${escape(time_jumps
    )} ${escape(time_steps)} ${escape(turns)} ${escape(velocity)}`

    console.log(cmd)
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
