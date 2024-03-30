import type ObjectModel from './Object'

type EventModel = {
  id: number
  title: string
  date: Date
  objects: ObjectModel[]
}

export default EventModel
