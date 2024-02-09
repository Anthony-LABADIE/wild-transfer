import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import * as DocumentPicker from 'expo-document-picker'
import styles from './styles'

const url = `${process.env.EXPO_PUBLIC_UPLOADS_API_URL}uploads/files`

const AddFile: React.FC = ({ navigation, route }: any) => {
  const [fileForm, setFileForm] = useState({
    name: '',
    description: '',
    tags: '',
    file: null,
  })

  const [isInputActive, setIsInputActive] = useState(false)
  const [isInputActiveDescription, setIsInputActiveDescription] =
    useState(false)
  const [isInputActiveTags, setIsInputActiveTags] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [fileInfoVisible, setFileInfoVisible] = useState(false)

  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      })

      if (file !== null && typeof file === 'object' && !('canceled' in file)) {
        setFileForm({ ...fileForm, file: file })
        setFileInfoVisible(true)
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de la sélection du fichier")
    }
  }

  const handleSwitchChange = (value) => {
    setIsSwitchOn(value)
  }

  const handleNext = async (authContext) => {
    if (!fileForm.name) {
      alert('Veuillez remplir le nom du fichier.')
      return
    }

    if (!fileForm.file) {
      alert('Veuillez sélectionner un fichier.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', fileForm.file)
      formData.append('title', fileForm.name)
      formData.append('description', fileForm.description)
      // formData.append("tags", fileForm.tags);
      formData.append('isPublic', isSwitchOn)
      formData.append('author', '64e53d54-43a1-468a-b999-448eeebb2b00')

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        navigation.navigate('TabNavigator')
      } else {
        alert('La soumission a échoué')
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de la soumission")
    }
  }

  return (
    <Animatable.View
      animation="slideInUp"
      duration={1000}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add files</Text>
        <Text style={styles.Subtitle}>
          Add information for the file you want to upload in your link
        </Text>

        <Animatable.View
          animation={isInputActive ? 'bounceIn' : undefined}
          duration={500}
          style={styles.formContainer}
        >
          <Text style={styles.label}>File Name:</Text>
          <TextInput
            style={[styles.input, isInputActive ? styles.inputActive : null]}
            value={fileForm.name}
            onChangeText={(value) => setFileForm({ ...fileForm, name: value })}
            placeholder="Enter file name"
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
          />
        </Animatable.View>

        <Animatable.View
          animation={isInputActiveDescription ? 'bounceIn' : undefined}
          duration={500}
          style={styles.formContainer}
        >
          <Text style={styles.label}>File Description:</Text>
          <TextInput
            style={[
              styles.input,
              isInputActiveDescription ? styles.inputActive : null,
            ]}
            value={fileForm.description}
            onChangeText={(value) =>
              setFileForm({ ...fileForm, description: value })
            }
            placeholder="Enter file description"
            multiline
            onFocus={() => setIsInputActiveDescription(true)}
            onBlur={() => setIsInputActiveDescription(false)}
          />
        </Animatable.View>

        <Animatable.View
          animation={isInputActiveTags ? 'bounceIn' : undefined}
          duration={500}
          style={styles.formContainer}
        >
          <Text style={styles.label}>Tags:</Text>
          <TextInput
            style={[
              styles.input,
              isInputActiveTags ? styles.inputActive : null,
            ]}
            value={fileForm.tags}
            onChangeText={(value) => setFileForm({ ...fileForm, tags: value })}
            placeholder="Enter tags (separated by spaces)"
            multiline
            onFocus={() => setIsInputActiveTags(true)}
            onBlur={() => setIsInputActiveTags(false)}
          />
        </Animatable.View>

        <TouchableOpacity style={styles.pickButton} onPress={handleFilePick}>
          <Text style={styles.pickButtonText}>Select File</Text>
        </TouchableOpacity>

        {fileInfoVisible && (
          <Animatable.View style={styles.fileInfoContainer}>
            <Text style={styles.fileInfo}>File Name: {fileForm.name}</Text>
            <Text style={styles.fileInfo}>
              File Description: {fileForm.description}
            </Text>
            <Text style={styles.fileInfo}>Tags: {fileForm.tags}</Text>
          </Animatable.View>
        )}

        <Animatable.View style={styles.switchContainer}>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            {isSwitchOn ? 'Privé' : 'Public'}
          </Text>
          <Switch
            value={isSwitchOn}
            onValueChange={handleSwitchChange}
            trackColor={{ false: 'grey', true: '#6A2AFE' }}
            thumbColor={isSwitchOn ? '#6A2AFE' : 'white'}
          />
        </Animatable.View>

        <Animatable.View
          animation="pulse"
          iterationCount={1}
          duration={500}
          easing="ease-out"
          style={styles.nextButtonContainer}
        >
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Image
              style={styles.imgFuse}
              source={require('../../../assets/Link/fuse.png')}
            />
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </Animatable.View>
  )
}

export default AddFile
function alert(arg0: string) {
  throw new Error(arg0)
}
