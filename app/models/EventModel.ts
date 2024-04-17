import type ObjectModel from './Object'

type EventModel = {
  title: string
  date: Date
  objects: ObjectModel[]
}

export default EventModel
