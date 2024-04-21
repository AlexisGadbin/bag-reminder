import { useQuery } from '@tanstack/react-query'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getEvents } from '../api/services/event.service'
import { setOnboardingStatus } from '../api/services/onboarding.service'
import { OnboardingStatus } from '../utils/enums/OnboardingStatus'

const Home = () => {
  const handlePress = async () => {
    void setOnboardingStatus(OnboardingStatus.EVENT_INFORMATION)
  }

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="Reset onboarding status" onPress={handlePress} />
      {events?.map((event, index) => (
        <View key={`event ${event.title}_${index}`}>
          <Text>{event.title}</Text>
          {event.objects.map((object, index) => (
            <Text key={`object ${object.name}_${index}`}>
              {object.name} - {object.amount}
            </Text>
          ))}
          <Text>{event.repeat.days.join(', ')}</Text>
          <Text>{event.repeat.hour.toString()}</Text>
        </View>
      ))}
    </SafeAreaView>
  )
}
export default Home
