import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  BottomTabBar,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'
import FileScreen from '../../screens/FileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../../screens/HomeScreen'
import { ProfileStackNavigator } from '../StackNavigator/ProfileStackNavigator'

type TabParamList = {
  Accueil: undefined
  Dossiers: undefined
  Profile: undefined
}

type BottomTabNavigationPropType = BottomTabNavigationProp<TabParamList>

type BottomTabNavigationOptionsType = {
  route: RouteProp<TabParamList, keyof TabParamList>
  navigation: BottomTabNavigationPropType
}

const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: BottomTabNavigationOptionsType): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Dossiers') {
            iconName = focused ? 'folder' : 'folder-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }

          // Retourne l'icône correspondante
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBar={(props: BottomTabBarProps) => (
        <BottomTabBar
          {...(props as any)}
          activeTintColor="blue"
          inactiveTintColor="gray"
        />
      )}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Dossiers" component={FileScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator
