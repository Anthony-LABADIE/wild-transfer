import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SettingProfile from '../Profile/SettingProfile'
import ProfileScreen from '../../screens/ProfileScreen'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SettingProfile" component={SettingProfile} />
    </Stack.Navigator>
  )
}

export { StackNavigator }
