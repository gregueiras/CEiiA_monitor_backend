const Data = require('./models/Data')

function saveData(data) {
  const d = new Data(data)
  d.validate(error => {
    console.log
    if (error) {
      console.error(error)
    } else {
      d.save((error) => {
        if (error) console.log(error)
        console.log('saved data')
      })
    }
  })
}

module.exports = { saveData }
