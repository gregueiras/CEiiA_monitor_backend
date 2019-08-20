const mongoose = require('mongoose')
const getInfo = require('./data/dataB8A3B8FF2446004197ED248BAD74B3B6')

const mode = process.env.NODE_ENV === 'development' ? 'test' : 'buoy'

const uri = `mongodb+srv://gregueiras:${
  process.env.MONGO_PASS
}@cluster0-b0rlq.mongodb.net/${mode}?retryWrites=true&w=majority`

mongoose.connect(uri, {
  useNewUrlParser: true,
})

async function test() {
  console.log(await getInfo())

  process.exit(0)
}

test()
