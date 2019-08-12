function loadModule(moduleName) {
  const path = `./data/data${moduleName}`;
  const data = require(path)

  return data
}

module.exports = { loadModule }
