import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import styles from '../signup/styles'
import Title from '../../components/Title/Title'
import AuthButton from '../../components/AuthButton/AuthButton'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../Graphql/mutations/User.mutations'
import { useAuth } from '../../context/UserContext'

interface SignupValues {
  email: string
  username: string
  password: string
}

export default function Signup({ navigation }) {
  const { signIn } = useAuth()
  const [register] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log('data', data)
    },
    onError(error) {
      console.log('ERROR', JSON.stringify(error))
    },
  })
  const [SignupValues, setSignupValues] = useState<SignupValues>({
    email: '',
    username: '',
    password: '',
  })

  const handleInputChange = (field: keyof SignupValues, value: string) => {
    setSignupValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    const { data } = await register({
      variables: { userToCreate: SignupValues },
    })
    if (data.message) {
      Alert.alert(data.message)
      return
    }
    signIn({ email: SignupValues.email, password: SignupValues.password })
  }

  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={SignupValues.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={SignupValues.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={SignupValues.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Text style={styles.privacytext}>
        En continuant, vous acceptez nos{' '}
        <Text style={styles.termsText}>Conditions d'utilisation</Text> et notre{' '}
        <Text style={styles.termsText}>Politique de confidentialité</Text>.
      </Text>

      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signuptxt}>S'inscrire</Text>
      </TouchableOpacity>
      <AuthButton />
    </View>
  )
}
