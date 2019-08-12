const dataO2P = require('./dataFECC1897228A25A0C50F7ADECDE97637/O2P')
const dataMGL = require('./dataFECC1897228A25A0C50F7ADECDE97637/mgL')

const O2Data = [
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

const O2Schema = [
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

const MiscData = [
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

const MiscSchema = [
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

const O2 = {
  data: O2Data,
  schema: O2Schema,
}

const Misc = {
  data: MiscData,
  schema: MiscSchema,
}

const dataBuoys = [
  {
    name: 'B2582',
    data: JSON.parse(process.env.TEST_DATA_0),
  },
  {
    name: 'B4242',
    data: JSON.parse(process.env.TEST_DATA_1),
  },/*
  {
    name: "B8952",
    data: JSON.parse(process.env.TEST_DATA_2),
  },
  {
    name: "B1482",
    data: JSON.parse(process.env.TEST_DATA_3),
  },
  */
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
    type: 'O2C',
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

const mapCenter = { lat: 37.739566, lng: -25.343753 }
const buoys = [
  { lat: 37.686081, lng: -24.605611, key: 'B2582' },
  { lat: 37.686081, lng: -26.005611, key: 'B4242' },
  { lat: 38.066081, lng: -25.385611, key: 'B8952' },
  { lat: 37.366081, lng: -25.225611, key: 'B1482' },
]

const name = 'S. Miguel'

module.exports = { O2, Misc, charts, mapCenter, buoys, name}
