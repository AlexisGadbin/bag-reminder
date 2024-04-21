import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getOnboardingStatus } from '../api/services/onboarding.service'
import { OnboardingStatus } from '../utils/enums/OnboardingStatus'
import Home from '../views/Home'
import Onboarding from '../views/onboarding'

export type RootStackParamList = {
  Home: undefined
  Onboarding: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Router = () => {
  const { data: onBoardingStatus } = useQuery({
    queryKey: ['onboardingStatus'],
    queryFn: getOnboardingStatus,
  })

  if (onBoardingStatus === undefined) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={onBoardingStatus === OnboardingStatus.COMPLETED ? 'Home' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Router
