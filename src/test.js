require('dotenv').config()
const { availableModules } = require('./loader')

console.log(availableModules())
