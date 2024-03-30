import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type EventModel from '../../models/EventModel'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type EventDateTimeProps = {
  setOnboardingStatus: (status: OnboardingStatus) => void
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
}

const EventDateTime = (props: EventDateTimeProps) => {
  const { setOnboardingStatus, onboardingEvent, setOnboardingEvent } = props

  const handlePress = () => {
    if (onboardingEvent.date < new Date()) {
      return
    }
    setOnboardingStatus(OnboardingStatus.RemindedObjects)
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
