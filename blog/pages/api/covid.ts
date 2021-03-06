import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'

const CovidDataSchema = new mongoose.Schema(
  {
    country: String,
    date: Date,
    deaths: Number,
  },
  { collection: 'countries_summary' }
)

const WaDataSchema = new mongoose.Schema(
  {
    country: String,
    date: Date,
    deaths: Number,
  },
  { collection: 'us_only' }
)

const yesterday = new Date()
const yesterdayDate = yesterday.setDate(yesterday.getDate() - 2)

let CovidData
let WaData
try {
  CovidData = mongoose.model('countries_summary')
} catch (error) {
  CovidData = mongoose.model('countries_summary', CovidDataSchema)
}

try {
  WaData = mongoose.model('us_only')
} catch (error) {
  WaData = mongoose.model('us_only', WaDataSchema)
}

mongoose.connect(
  'mongodb+srv://readonly:readonly@covid-19.hip2i.mongodb.net/covid19',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

export default async (req: NowRequest, res: NowResponse) => {
  const covidData = await CovidData.find({
    country: 'US',
    date: {
      $gt: new Date(yesterdayDate),
      $lt: new Date(),
    },
  })

  const snoData = await WaData.find({
    state: 'Washington',
    county: 'Snohomish',
    date: {
      $gt: new Date(yesterdayDate),
      $lt: new Date(),
    },
  })
  mongoose.disconnect()

  res.status(200).send({ covidData, snoData })
}
