const Data = require('../database/models/Data')

async function getData(type, location, buoys) {
  return await Promise.all(
    buoys.map( async ({ key: name }) => {
      const temp = await Data.find({ location, buoy: name, type }).sort([['timeStamp']])
      const data = temp.map(({timeStamp, value}) => [timeStamp, value])
      return { name, data }
    })
  )
}

module.exports = getData