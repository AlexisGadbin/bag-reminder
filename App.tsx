import { SafeAreaProvider } from 'react-native-safe-area-context'
import Router from './app/router'

export default function App() {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  )
}
