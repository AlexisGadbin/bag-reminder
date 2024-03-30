import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type EventModel from '../../models/EventModel'
import { type RootStackParamList } from '../../router'
import { type OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type RemindedObjectsProps = {
  setOnboardingStatus: (status: OnboardingStatus) => void
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding', undefined>
}

const RemindedObjects = (props: RemindedObjectsProps) => {
  const { setOnboardingStatus, onboardingEvent, setOnboardingEvent, navigation } = props

  const handlePress = () => {
    // if (onboardingEvent.objects.length === 0) {
    //   return
    // }
    navigation.replace('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>RemindedObjects</Text>
      <Button title="Next" onPress={handlePress} />
    </SafeAreaView>
  )
}
export default RemindedObjects

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
