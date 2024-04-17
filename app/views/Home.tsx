import { useQuery } from '@tanstack/react-query'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getEvents } from '../api/services/event.service'
import { setOnboardingStatus } from '../api/services/onboarding.service'
import { OnboardingStatus } from '../utils/enums/OnboardingStatus'

const Home = () => {
  const handlePress = async () => {
    void setOnboardingStatus(OnboardingStatus.EventInformation)
  }

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="Reset onboarding status" onPress={handlePress} />
      {events?.map((event) => (
        <View key={event.title}>
          <Text>{event.title}</Text>
          <Text>{event.date.toString()}</Text>
          {event.objects.map((object) => (
            <Text key={object.name}>
              {object.name} - {object.amount}
            </Text>
          ))}
        </View>
      ))}
    </SafeAreaView>
  )
}
export default Home
