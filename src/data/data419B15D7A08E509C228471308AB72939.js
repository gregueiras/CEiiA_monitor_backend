const { getData } = require('./aux')
const name = 'Madeira'

async function getInfo() {
  const o2Data = [
    {
      name: 'Max',
      o2P: '90.1',
      o2mg: '7.7',
      hypoxia: '3.3',
    },
    {
      name: 'Avg',
      o2P: '85.6',
      o2mg: '7.1',
      hypoxia: '2.4',
    },
    {
      name: 'Min',
      o2P: '81.0',
      o2mg: '6.6',
      hypoxia: '1.6',
    },
  ]

  const o2Schema = [
    {
      Header: '',
      accessor: 'name', // String-based value accessors!
    },
    {
      accessor: 'o2P',
    },
    {
      accessor: 'o2mg',
    },
    {
      Header: 'Hypoxia',
      accessor: 'hypoxia',
    },
  ]

  const miscData = [
    {
      name: 'Max',
      WFms: '2.2',
      CT: '25.8',
      Temp: '19.7',
    },
    {
      name: 'Avg',
      WFms: '2.0',
      CT: '15.5',
      Temp: '14.0',
    },
    {
      name: 'Min',
      WFms: '1.4',
      CT: '7.4',
      Temp: '4.7',
    },
  ]

  const miscSchema = [
    {
      Header: '',
      accessor: 'name', // String-based value accessors!,
    },
    {
      Header: 'WF m/s',
      accessor: 'WFms',
    },
    {
      Header: 'CT ‰',
      accessor: 'CT',
    },
    {
      Header: 'ºC',
      accessor: 'Temp',
    },
  ]

  const o2 = {
    data: o2Data,
    schema: o2Schema,
  }

  const misc = {
    data: miscData,
    schema: miscSchema,
  }

  const mapCenter = { lat: 32.71983, lng: -16.933546 }
  const buoys = [
    { lat: 32.672961, lng: -16.688149, key: 'B1122' },
    { lat: 32.599273, lng: -16.748526, key: 'B1314' },
    { lat: 32.595446, lng: -17.039024, key: 'B2560' },
    { lat: 32.521459, lng: -16.83536, key: 'B4753' },
  ]

  const [dataO2P, dataO2MG, dataWT] = await Promise.all([
    getData('O2P', name, buoys),
    getData('O2MG', name, buoys),
    getData('WT', name, buoys),
  ])

  const charts = [
    {
      data: dataO2P,
      yTitle: '%',
      title: 'Oxygen Percentage',
      type: 'O2P',
    },
    {
      data: dataO2MG,
      yTitle: 'mg/L',
      title: 'Oxygen (mg/L)',
      type: 'O2MG',
    },
    {
      name: 'Current Speed',
    },
    {
      data: dataWT,
      yTitle: 'ºC',
      title: 'Water Temperature',
      type: 'WT',
      name: 'Water Temperature',
    },
  ]

  return { o2, misc, charts, mapCenter, buoys, name }
}

module.exports = { getInfo, name }
