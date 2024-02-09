import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'

interface ConfigLinkProps {
  navigation: any
}

const ConfigLink: React.FC<ConfigLinkProps> = ({ navigation }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [emails, setEmails] = useState([''])

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails]
    updatedEmails[index] = value
    setEmails(updatedEmails)
  }

  const addEmailField = () => {
    const updatedEmails = [...emails, '']
    setEmails(updatedEmails)
  }

  const handleNext = () => {
    navigation.navigate('AddFile', {
      LinkName: name,
      LinkDescription: description,
      LinkEmails: emails,
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configure your link</Text>
      <Text style={styles.Subtitle}>
        configure your link and add people to share your files with them
      </Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Email:</Text>
      {emails.map((email, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={email}
          onChangeText={(value) => handleEmailChange(index, value)}
          placeholder="Enter email"
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addEmailField}>
        <Image source={require('../../../assets/Link/PlusCircle.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Add files</Text>
        <Image
          style={styles.imgArrow}
          source={require('../../../assets/Link/arrowcircle.png')}
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#6A2AFE',
  },
  Subtitle: {
    fontSize: 20,
    paddingBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#6A2AFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imgArrow: {
    marginLeft: 15,
  },
})

export default ConfigLink
