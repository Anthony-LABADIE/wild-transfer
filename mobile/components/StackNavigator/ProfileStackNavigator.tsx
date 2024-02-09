import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SettingProfile from '../Profile/SettingProfile'
import ProfileScreen from '../../screens/ProfileScreen'
import SettingPassword from '../Profile/SettingPassword'
import SettingNotification from '../Profile/SettingNotification'
import SettingHelp from '../Profile/SettingHelp'

const Stack = createStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profiles"
        component={ProfileScreen}
      />
      <Stack.Screen name="SettingProfile" component={SettingProfile} />
      <Stack.Screen name="SettingPassword" component={SettingPassword} />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotification}
      />
      <Stack.Screen name="SettingHelp" component={SettingHelp} />
    </Stack.Navigator>
  )
}

export { ProfileStackNavigator }
