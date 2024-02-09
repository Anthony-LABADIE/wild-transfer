import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './Graphql/Client/Client'
import { StyleSheet } from 'react-native'
import UserContextProvider, { useAuth } from './context/UserContext'
import { NavigationContainer } from '@react-navigation/native'

import Navigation from './Navigation'

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <UserContextProvider>
          <Navigation />
        </UserContextProvider>
      </NavigationContainer>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDECE0',
  },
})

export default App
