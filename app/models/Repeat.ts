import { type DateTime } from 'luxon'
import { type Days } from '../utils/enums/Days'

type RepeatModel = {
  days: Days[]
  hour: DateTime
}

export default RepeatModel
