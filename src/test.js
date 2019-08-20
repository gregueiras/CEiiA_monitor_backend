const mongoose = require('mongoose')
require('dotenv-load')()
const { getMax } = require('./data/aux')

const mode = process.env.NODE_ENV === 'development' ? 'test' : 'buoy'

const uri = `mongodb+srv://gregueiras:${
  process.env.MONGO_PASS
}@cluster0-b0rlq.mongodb.net/${mode}?retryWrites=true&w=majority`

mongoose.connect(uri, {
  useNewUrlParser: true,
})

async function test() {
  console.log(await getMax('O2P', 'Terceira'))

  process.exit(0)
}

test()
