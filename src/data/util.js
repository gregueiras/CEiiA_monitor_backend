const Data = require('../database/models/Data')

async function getData(type, location, buoys) {
  return await Promise.all(
    buoys.map(async ({ key: name }) => {
      const temp = await Data.find({ location, buoy: name, type }).sort([
        ['timeStamp'],
      ])
      const data = temp.map(({ timeStamp, value }) => [timeStamp, value])
      return { name, data }
    })
  )
}

async function getMin(type, location) {
  const res = await Data.find({ location, type })
    .sort({ value: 1 })
    .limit(1)
  
  const { value } = res[0]
  return value
}

async function getMax(type, location) {
  const res = await Data.find({ location, type })
    .sort({ value: -1 })
    .limit(1)
  
  const { value } = res[0]
  return value
}

module.exports = { getData, getMax, getMin }
