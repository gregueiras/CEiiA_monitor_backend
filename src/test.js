const mongoose = require('mongoose')
require('dotenv-load')()
const { getData } = require('./data/aux')
const { saveData } = require('./database/aux')

const mode = process.env.NODE_ENV === 'development' ? 'test' : 'buoy'

const uri = `mongodb+srv://gregueiras:${
  process.env.MONGO_PASS
}@cluster0-b0rlq.mongodb.net/${mode}?retryWrites=true&w=majority`

mongoose.connect(uri, {
  useNewUrlParser: true,
})

async function test() {
  const buoys = [
    { lat: 38.864673, lng: -27.198971, key: 'B4712' },
    { lat: 38.783374, lng: -26.952793, key: 'B4241' },
    { lat: 38.701063, lng: -26.951252, key: 'B4520' },
    { lat: 38.596731, lng: -26.989337, key: 'B4209' },
  ]

  const location = 'Terceira'
  let type = 'O2T'
  const data = await getData(type, location, buoys)
  console.log(data)

  data.forEach(({ name: buoy, data }) => {
    data.forEach(([timeStamp, value]) => {
      saveData({ buoy, location: 'Madeira', type, value, timeStamp })
    })
  })

  type = 'WT'
  const data1 = await getData(type, location, buoys)
  console.log(data)

  data1.forEach(({ name: buoy, data }) => {
    data.forEach(([timeStamp, value]) => {
      saveData({ buoy, location: 'Madeira', type, value, timeStamp })
    })
  })

  //process.exit(0)
}

test()
