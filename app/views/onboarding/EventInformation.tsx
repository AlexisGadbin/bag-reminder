import { Button, StyleSheet, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type EventModel from '../../models/EventModel'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type EventInformationProps = {
  setOnboardingStatus: (status: OnboardingStatus) => void
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
}

const EventInformation = (props: EventInformationProps) => {
  const { setOnboardingStatus, onboardingEvent, setOnboardingEvent } = props

  const handlePress = () => {
    if (onboardingEvent.title === '') {
      return
    }
    setOnboardingStatus(OnboardingStatus.EventDateTime)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>EventInformation</Text>
      <TextInput
        placeholder="Event Name"
        id="title"
        style={styles.input}
        value={onboardingEvent.title}
        onChangeText={(text) => {
          setOnboardingEvent({ ...onboardingEvent, title: text })
        }}
      />
      <Button title="Next" onPress={handlePress} />
    </SafeAreaView>
  )
}
export default EventInformation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    padding: 10,
    margin: 10,
  },
})
