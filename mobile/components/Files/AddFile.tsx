import Title from '../Title/Title'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'

export default function AddFile() {
  const signupPressed = () => {
    Alert.alert('Document added')
  }

  return (
    <View style={styles.background}>
      <View>
        <Title />
        <Image
          source={require('../assets/Wavy_Bus.png')}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
        <TouchableOpacity style={styles.signupButton} onPress={signupPressed}>
          <Text style={styles.signuptxt}>Add document</Text>
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
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%',
  },
  text: {
    color: 'white',
    marginTop: '-25%',
    marginLeft: '20%',
  },
  signupButton: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    backgroundColor: '#6A2AFE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 95,
    marginBottom: 30,
  },
  signuptxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  login: {
    backgroundColor: '#3A59FF',
    color: 'white',
    width: '75%',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: '2%',
    fontSize: 27,
    marginTop: '10%',
  },
})
