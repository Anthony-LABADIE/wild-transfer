import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import Title from '../../components/Title/Title'
import AuthButton from '../../components/AuthButton/AuthButton'
import styles from './Styles'
import { useAuth } from '../../context/UserContext'

interface LoginValues {
  email: string
  password: string
}

export default function Login({ navigation }) {
  const { signIn } = useAuth()
  const [LoginValues, setLoginValues] = useState<LoginValues>({
    email: '',
    password: '',
  })

  const handleInputChange = (field: keyof LoginValues, value: string) => {
    setLoginValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    signIn(LoginValues)
  }

  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={LoginValues.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={LoginValues.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      <Text style={styles.privacytext}>
        En continuant, vous acceptez nos{' '}
        <Text style={styles.termsText}>Conditions d'utilisation</Text> et notre{' '}
        <Text style={styles.termsText}>Politique de confidentialité</Text>.
      </Text>
      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signuptxt}>Se connecter</Text>
      </TouchableOpacity>

      <AuthButton />
    </View>
  )
}
