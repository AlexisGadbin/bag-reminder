import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useQueryClient } from '@tanstack/react-query'
import Checkbox from 'expo-checkbox'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setOnboardingStatus } from '../../api/services/onboarding.service'
import type EventModel from '../../models/EventModel'
import { Days } from '../../utils/enums/Days'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

type EventDateTimeProps = {
  onboardingEvent: EventModel
  setOnboardingEvent: (event: EventModel) => void
}

const EventDateTime = (props: EventDateTimeProps) => {
  const { onboardingEvent, setOnboardingEvent } = props
  const [repeat, setRepeat] = useState(onboardingEvent.repeat)
  const queryClient = useQueryClient()

  const handlePress = async () => {
    if (repeat.days.length === 0) {
      return
    }
    setOnboardingEvent({
      ...onboardingEvent,
      repeat,
    })

    await setOnboardingStatus(OnboardingStatus.REMINDED_OBJECTS)
    await queryClient.invalidateQueries({
      queryKey: ['onboardingStatus'],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {(Object.keys(Days) as Array<keyof typeof Days>).map((day) => (
          <View key={day}>
            <Checkbox
              value={repeat.days.includes(Days[day])}
              onValueChange={(isChecked) => {
                if (isChecked) {
                  setRepeat({
                    ...repeat,
                    days: [...repeat.days, Days[day]],
                  })
                } else {
                  setRepeat({
                    ...repeat,
                    days: repeat.days.filter((d) => d !== Days[day]),
                  })
                }
              }}
            />
            <Text>{day}</Text>
          </View>
        ))}
      </View>

      <RNDateTimePicker
        mode="countdown"
        value={onboardingEvent.repeat.hour.toJSDate()}
        onChange={(_, selectedTime) => {
          if (selectedTime != null) {
            setRepeat({
              ...repeat,
              hour: DateTime.fromJSDate(selectedTime),
            })
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
