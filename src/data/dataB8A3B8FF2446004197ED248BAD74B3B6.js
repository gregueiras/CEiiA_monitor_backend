const {dataO2P} = require('./dataFECC1897228A25A0C50F7ADECDE97637/O2P')
const {dataMGL} = require('./dataFECC1897228A25A0C50F7ADECDE97637/mgL')

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

const dataBuoys = [
  {
    name: 'B4712',
    data: JSON.parse(process.env.TEST_DATA_4),
  },
  {
    name: 'B4241',
    data: JSON.parse(process.env.TEST_DATA_5),
  },
  {
    name: 'B4520',
    data: JSON.parse(process.env.TEST_DATA_6),
  },
  {
    name: 'B4209',
    data: JSON.parse(process.env.TEST_DATA_7),
  },
]

const charts = [
  {
    data: process.env.NODE_ENV === 'development' ? dataBuoys : dataO2P,
    yTitle: '%',
    title: 'Oxygen Percentage',
    type: 'O2P',
  },
  {
    data: process.env.NODE_ENV === 'development' ? dataBuoys : dataMGL,
    yTitle: 'mg/L',
    title: 'Oxygen (mg/L)',
    type: 'O2MG',
  },
  {
    name: 'Salinity',
  },
  {
    name: 'Current Speed',
  },
  {
    name: 'Temperature',
  },
]

const mapCenter = { lat: 38.7211917, lng: -27.2805513 }
const buoys = [
  { lat: 38.864673, lng: -27.198971, key: 'B4712' },
  { lat: 38.783374, lng: -26.952793, key: 'B4241' },
  { lat: 38.701063, lng: -26.951252, key: 'B4520' },
  { lat: 38.596731, lng: -26.989337, key: 'B4209' },
]

const name = 'Terceira'

module.exports = { o2, misc, charts, mapCenter, buoys, name }
