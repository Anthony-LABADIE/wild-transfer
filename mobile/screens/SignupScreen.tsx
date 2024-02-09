import Title from '../components/Title/Title'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function SignupScreen({ navigation }) {
  const signupPressed = () => {
    navigation.navigate('Inscription')
  }

  const loginPressed = () => {
    navigation.navigate('Connexion')
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Title />
        <Image
          source={require('../assets/Signup.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/dots.png')}
          style={styles.dots}
          resizeMode="contain"
        />
        <Text style={styles.text}>Gratuit</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>
          Créez un compte pour accéder à l'application
        </Text>
      </View>
      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.signupButton} onPress={signupPressed}>
          <Text style={styles.signuptxt}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={loginPressed}>
          <Text style={styles.logintxt}>
            Vous avez un compte ? Connectez-vous.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FDECE0',
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: '20%',
  },
  logo: {
    width: 280,
    height: 250,
    marginLeft: '15%',
    marginTop: '2%',
  },
  dots: {
    width: 60,
    alignSelf: 'center',
  },
  containerBtn: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginTop: '5%',
    marginLeft: '8%',
  },
  signupButton: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    backgroundColor: '#6A2AFE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signuptxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginButton: {
    alignSelf: 'center',
  },
  logintxt: {
    color: '#3A59FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: '#66625D',
    borderBottomWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
})
