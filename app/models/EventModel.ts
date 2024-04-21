import type ObjectModel from './Object'
import type RepeatModel from './Repeat'

type EventModel = {
  title: string
  repeat: RepeatModel
  objects: ObjectModel[]
}

export default EventModel
