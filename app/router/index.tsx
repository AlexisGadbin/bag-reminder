import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import Home from '../views/Home'
import Onboarding from '../views/onboarding'

export type RootStackParamList = {
  Home: undefined
  Onboarding: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Router = () => {
  const { getItem } = useAsyncStorage('onboardingStatus')
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null)

  useEffect(() => {
    const getOnboardingStatus = async () => {
      const onboardingStatus = await getItem()
      setOnboardingStatus(onboardingStatus)
    }

    getOnboardingStatus().catch(() => {
      setOnboardingStatus('uncompleted')
    })
  }, [getItem])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={onboardingStatus === 'completed' ? 'Home' : 'Onboarding'}
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
