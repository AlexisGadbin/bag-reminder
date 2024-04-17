import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getOnboardingStatus } from '../../api/services/onboarding.service'
import type EventModel from '../../models/EventModel'
import { type RootStackParamList } from '../../router'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'
import EventDateTime from './EventDateTime'
import EventInformation from './EventInformation'
import RemindedObjects from './RemindedObjects'

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const Onboarding = (props: OnboardingProps) => {
  const { navigation } = props
  const [onboardingEvent, setOnboardingEvent] = useState<EventModel>({
    title: '',
    date: new Date(),
    objects: [],
  })

  const { data: onBoardingStatus } = useQuery({
    queryKey: ['onboardingStatus'],
    queryFn: getOnboardingStatus,
  })

  switch (onBoardingStatus) {
    case OnboardingStatus.EventInformation:
      return (
        <EventInformation
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
        />
      )
    case OnboardingStatus.EventDateTime:
      return (
        <EventDateTime onboardingEvent={onboardingEvent} setOnboardingEvent={setOnboardingEvent} />
      )
    case OnboardingStatus.RemindedObjects:
      return (
        <RemindedObjects
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
          navigation={navigation}
        />
      )
  }
}
export default Onboarding
