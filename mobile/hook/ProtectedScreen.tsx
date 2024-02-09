import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../context/UserContext'

const ProtectedScreen = () => {
  const { token } = useAuth()

  if (token === null) {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    )
  }
}

export default ProtectedScreen
