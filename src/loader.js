function loadModule(moduleName) {
  const path = `./data/data${moduleName}`;
  console.log(path)
  const data = require(path)

  return data
}

module.exports = { loadModule }
