import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import TabNavigator from './components/Tab/TabNavigator'
import { StyleSheet, View } from 'react-native'
import SignupScreen from './screens/SignupScreen'
import Login from './screens/Login/Login'
import Signup from './screens/signup/Signup'
import { useAuth } from './context/UserContext'
import AddFile from './screens/Link/AddFiles/AddFile'
import ListFiles from './screens/ShareUrl/ListFiles'
import ListFilesSharedurl from './screens/ShareUrl/ListFilesSharedurl'
import FileDetail from './screens/ShareUrl/FileDetail'

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator initialRouteName="SignupScreen">
    <Stack.Screen
      options={{ headerShown: false }}
      name="SignupScreen"
      component={SignupScreen}
    />
    <Stack.Screen name="Connexion" component={Login} />
    <Stack.Screen name="Inscription" component={Signup} />
  </Stack.Navigator>
)

const AppStack = () => (
  <Stack.Navigator initialRouteName="TabNavigator">
    <Stack.Screen
      options={{ headerShown: false }}
      name="TabNavigator"
      component={TabNavigator}
    />
    <Stack.Screen
      name="AddFile"
      component={AddFile}
      options={{ title: 'Ajouter un fichier' }}
    />
    <Stack.Screen
      name="FileList"
      component={ListFiles}
      options={{ title: 'Liste des fichiers' }}
    />
    <Stack.Screen
      name="ListFilesSharedurl"
      component={ListFilesSharedurl}
      options={{ title: 'Liste des fichiers' }}
    />
    <Stack.Screen
      name="FileDetail"
      component={FileDetail}
      options={{ title: 'Fichier' }}
    />
  </Stack.Navigator>
)

const Navigation = () => {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      {!user || user.message ? <AuthStack /> : <AppStack />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDECE0',
  },
})

export default Navigation
