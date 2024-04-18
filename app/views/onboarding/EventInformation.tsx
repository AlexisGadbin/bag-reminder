import { useQueryClient } from '@tanstack/react-query'
import { Button, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setOnboardingStatus } from '../../api/services/onboarding.service'
import type EventModel from '../../models/EventModel'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type EventInformationProps = {
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
}

const EventInformation = (props: EventInformationProps) => {
  const { onboardingEvent, setOnboardingEvent } = props
  const queryClient = useQueryClient()

  const handlePress = async () => {
    if (onboardingEvent.title === '') {
      return
    }
    await setOnboardingStatus(OnboardingStatus.EventDateTime)
    await queryClient.invalidateQueries({
      queryKey: ['onboardingStatus'],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
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
