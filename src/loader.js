const fs = require('fs')
const dataFolder = './data/'

function loadModule(moduleName) {
  const path = `./data/data${moduleName}`
  const data = require(path)

  return data
}

function availableModules() {
  const regex = /.*(\.js)/gm

  const folder = fs.readdirSync(`${__dirname}/${dataFolder}`)
  return folder
    .filter(val => val.match(regex))
    .map(val => {
      return require(`${dataFolder}/${val}`).name
    })
}

module.exports = { loadModule, availableModules }
