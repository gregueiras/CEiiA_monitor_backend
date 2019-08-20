const fs = require('fs')
const dataFolder = './data/'

async function loadModule(moduleName) {
  const path = `./data/data${moduleName}`
  const { getInfo } = require(path)

  console.log(`Request ${moduleName}`)
  const info = await getInfo()
  console.log(`Module loaded ${moduleName}`)
  return info
}

function availableModules() {
  const regex = /^(data)(.*)\.js/gm
  
  const folder = fs.readdirSync(`${__dirname}/${dataFolder}`)
  return folder
    .filter(val => val.match(regex))
    .map(val => {
      return require(`${dataFolder}/${val}`).name
    })
}

module.exports = { loadModule, availableModules }
