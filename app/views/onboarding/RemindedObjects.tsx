import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addEvent } from '../../api/services/event.service'
import { setOnboardingStatus } from '../../api/services/onboarding.service'
import type EventModel from '../../models/EventModel'
import type ObjectModel from '../../models/Object'
import { type RootStackParamList } from '../../router'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type RemindedObjectsProps = {
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding', undefined>
}

const RemindedObjects = (props: RemindedObjectsProps) => {
  const { onboardingEvent, setOnboardingEvent, navigation } = props
  const [object, setObject] = useState<ObjectModel>({ name: '', amount: -1 })

  const saveEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: async () => {
      await setOnboardingStatus(OnboardingStatus.Completed)
      navigation.replace('Home')
    },
  })

  const handleAddObject = () => {
    if (object.name === '' || object.amount <= 0) {
      return
    }
    setOnboardingEvent({
      ...onboardingEvent,
      objects: [...onboardingEvent.objects, object],
    })
    setObject({ name: '', amount: -1 })
  }

  const handlePress = () => {
    if (onboardingEvent.objects.length === 0) {
      return
    }

    saveEventMutation.mutate(onboardingEvent)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>What objects do you want to be reminded of?</Text>
      <TextInput
        style={styles.input}
        placeholder="Object name"
        onChangeText={(text) => {
          setObject({ ...object, name: text })
        }}
        value={object.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={(text) => {
          setObject({ ...object, amount: text === '' ? -1 : parseInt(text) })
        }}
        value={object.amount === -1 ? undefined : object.amount.toString()}
      />
      <Button title="Add" onPress={handleAddObject} />
      {onboardingEvent.objects.map((object, index) => (
        <Text key={index}>
          {object.name} - {object.amount}
        </Text>
      ))}
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
