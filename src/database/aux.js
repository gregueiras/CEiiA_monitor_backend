const Data = require('./models/Data')

function saveData(data) {
  console.log('Saving')
  console.log(data)
  const d = new Data(data)
  console.log(d)
  d.validate((error) => {
    if (error) {
      console.error(error)
    } else {
      console.log('saved data')
      d.save()
    }
  })
}

module.exports = { saveData }