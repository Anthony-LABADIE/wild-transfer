import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { USER_UPDATE } from '../../Graphql/mutations/User.mutations'
import { useAuth } from '../../context/UserContext'

interface InputValues {
  name: string
  email: string
}

const SettingProfile = () => {
  const { user } = useAuth()
  const [updateUser] = useMutation(USER_UPDATE, {
    onCompleted: (data) => {
      console.log('data', data)
    },
    onError(error) {
      console.log('ERROR', JSON.stringify(error))
    },
  })

  const [input, setInput] = useState<InputValues>({
    name: '',
    email: '',
  })

  const onChangeName = (field: keyof InputValues, value: string) => {
    setInput((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }
  const onSubmit = () => {
    updateUser({
      variables: { userToUpdate: input, updateUserId: user?.id },
    })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.profilePic}
          source={require('../../assets/connection/harambe.png')}
        />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={user?.username}
          onChangeText={(value) => onChangeName('name', value)}
          value={input.name}
        />
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={user?.email}
          onChangeText={(value) => onChangeName('email', value)}
          value={input.email}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Sent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SettingProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDECE0',
    flex: 1,
  },
  containerImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  containerInput: {
    flex: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  TextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 100,
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    shadowRadius: 10,
    paddingLeft: 10,
  },
})
