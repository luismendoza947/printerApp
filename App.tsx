import React from 'react'
import 'react-native-gesture-handler'
import Navigator from './src/Navigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigator />
    </GestureHandlerRootView>
  )
}

export default App
