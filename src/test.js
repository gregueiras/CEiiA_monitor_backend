require('dotenv').config()
const loader = require('./loader').loadModule
const md5 = require('md5')

const hash = md5('S. Miguel').toUpperCase()
const loaded = loader(hash)

console.log(loaded)
