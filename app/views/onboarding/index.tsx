import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'
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
    repeat: {
      days: [],
      hour: DateTime.now(),
    },
    objects: [],
  })

  const { data: onBoardingStatus } = useQuery({
    queryKey: ['onboardingStatus'],
    queryFn: getOnboardingStatus,
  })

  switch (onBoardingStatus) {
    case OnboardingStatus.EVENT_INFORMATION:
      return (
        <EventInformation
          onboardingEvent={onboardingEvent}
          setOnboardingEvent={setOnboardingEvent}
        />
      )
    case OnboardingStatus.EVENT_DATE_TIME:
      return (
        <EventDateTime onboardingEvent={onboardingEvent} setOnboardingEvent={setOnboardingEvent} />
      )
    case OnboardingStatus.REMINDED_OBJECTS:
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
