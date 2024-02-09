import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
const AuthButton: React.FC = () => {
  return (
    <>
      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          style={styles.buttonLogo}
          source={require('../../assets/connection/apple.png')}
        />
        <Text style={styles.buttonText}>Se connecter avec Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          style={styles.buttonLogo}
          source={require('../../assets/connection/google.png')}
        />
        <Text style={styles.buttonText}>Se connecter avec Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          style={styles.buttonLogo}
          source={require('../../assets/connection/github.png')}
        />
        <Text style={styles.buttonText}>Se connecter avec Github</Text>
      </TouchableOpacity>
    </>
  )
}

export default AuthButton
