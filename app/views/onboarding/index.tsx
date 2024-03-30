import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import type EventModel from '../../models/EventModel'
import { type RootStackParamList } from '../../router'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'
import EventDateTime from './EventDateTime'
import EventInformation from './EventInformation'
import RemindedObjects from './RemindedObjects'

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const Onboarding = (props: OnboardingProps) => {
  const { navigation } = props
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>(
    OnboardingStatus.EventInformation
  )
  const [onboardingEvent, setOnboardingEvent] = useState<EventModel>({
    id: 0,
    title: '',
    date: new Date(),
    objects: [],
  })

  switch (onboardingStatus) {
    case OnboardingStatus.EventInformation:
      return (
        <EventInformation
          setOnboardingStatus={setOnboardingStatus}
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
        />
      )
    case OnboardingStatus.EventDateTime:
      return (
        <EventDateTime
          setOnboardingStatus={setOnboardingStatus}
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
        />
      )
    case OnboardingStatus.RemindedObjects:
      return (
        <RemindedObjects
          setOnboardingStatus={setOnboardingStatus}
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
          navigation={navigation}
        />
      )
  }
}
export default Onboarding
