import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useQueryClient } from '@tanstack/react-query'
import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setOnboardingStatus } from '../../api/services/onboarding.service'
import type EventModel from '../../models/EventModel'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type EventDateTimeProps = {
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
}

const EventDateTime = (props: EventDateTimeProps) => {
  const { onboardingEvent, setOnboardingEvent } = props
  const queryClient = useQueryClient()

  const handlePress = async () => {
    if (onboardingEvent.date < new Date()) {
      return
    }
    await setOnboardingStatus(OnboardingStatus.RemindedObjects)
    await queryClient.invalidateQueries({
      queryKey: ['onboardingStatus'],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>EventDateTime</Text>
      <RNDateTimePicker
        mode="datetime"
        value={onboardingEvent.date}
        onChange={(_, selectedDate) => {
          if (selectedDate != null) {
            setOnboardingEvent({ ...onboardingEvent, date: selectedDate })
          }
        }}
      />
      <Button title="Next" onPress={handlePress} />
    </SafeAreaView>
  )
}

export default EventDateTime

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
