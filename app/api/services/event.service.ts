import AsyncStorage from '@react-native-async-storage/async-storage'
import type EventModel from '../../models/EventModel'

export const setEvent = async (event: EventModel): Promise<void> => {
  await AsyncStorage.setItem('event', JSON.stringify(event))
}

export const getEvents = async (): Promise<EventModel[]> => {
  const storedEvents = await AsyncStorage.getItem('events')
  if (storedEvents == null) {
    return []
  }
  return (JSON.parse(storedEvents) as EventModel[]) ?? []
}

export const addEvent = async (event: EventModel): Promise<void> => {
  const storedEvents = await getEvents()
  await AsyncStorage.setItem('events', JSON.stringify([...storedEvents, event]))
}

export const deleteEvents = async (): Promise<void> => {
  await AsyncStorage.removeItem('events')
}
