import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddFile from '../../screens/Link/AddFiles/AddFile'
import ConfigLink from '../../screens/Link/ConfigLink/ConfigLink'
import FileScreen from '../../screens/FileScreen'

const Stack = createStackNavigator()

const FileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ConfigLink" component={ConfigLink} />
      <Stack.Screen name="AddFile" component={AddFile} />
      <Stack.Screen name="Filescreen" component={FileScreen} />
    </Stack.Navigator>
  )
}

export { FileStackNavigator }
