import AsyncStorage from '@react-native-async-storage/async-storage'
import { OnboardingStatus } from '../../utils/enums/OnboardingStatus'

export const getOnboardingStatus = async (): Promise<OnboardingStatus> => {
  const storedStatus = await AsyncStorage.getItem('onboardingStatus')
  return (storedStatus as OnboardingStatus) ?? OnboardingStatus.EVENT_INFORMATION
}

export const setOnboardingStatus = async (status: OnboardingStatus): Promise<void> => {
  await AsyncStorage.setItem('onboardingStatus', status)
}
