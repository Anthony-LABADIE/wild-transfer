import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import ProfileHeader from './ProfileHeader'
import { useMutation } from '@apollo/client'
import { USER_UPDATE } from '../../Graphql/mutations/User.mutations'
import { useAuth } from '../../context/UserContext'

interface InputValues {
  oldPassword: string
  newPassword: string
  password: string
}

const SettingPassword = () => {
  const [password, setPassword] = useState<InputValues>({
    oldPassword: '',
    newPassword: '',
    password: '',
  })
  const [updateUser] = useMutation(USER_UPDATE, { fetchPolicy: 'no-cache' })
  const { user } = useAuth()
  const onChangePassword = (field: keyof InputValues, value: string) => {
    setPassword((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  const onPressPassword = (data) => {
    if (
      password.oldPassword === '' ||
      password.newPassword === '' ||
      password.password === ''
    ) {
      Alert.alert('Please fill all the fields')
    }
    if (password.newPassword !== password.password) {
      Alert.alert('New password and confirm password must be the same')
    }
    if (data.UpdateUser.success === true) {
      Alert.alert('Password updated successfully')
    } else {
      Alert.alert(data.UpdateUser.message)
    }
  }

  const onSubmit = async () => {
    console.log('user', user)
    const { data } = await updateUser({
      variables: {
        userToUpdate: {
          password: password.newPassword,
          oldPassword: password.oldPassword,
        },
        updateUserId: user?.id,
      },
    })
    onPressPassword(data)
  }
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.containerText}>
        <Text style={styles.text}>Update your Password</Text>
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Old Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          onChangeText={(value) => onChangePassword('oldPassword', value)}
          value={password.oldPassword}
        />
        <Text style={styles.title}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          onChangeText={(value) => onChangePassword('newPassword', value)}
          value={password.newPassword}
        />
        <Text style={styles.title}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(value) => onChangePassword('password', value)}
          value={password.password}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Sent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SettingPassword

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDECE0',
    flex: 1,
    padding: 20,
  },
  containerText: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerInput: {
    flex: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    shadowRadius: 10,
    paddingLeft: 10,
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#6A2AFE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
