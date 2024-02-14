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
import { File } from 'buffer'

const url = `${process.env.EXPO_PUBLIC_UPLOADS_API_URL}uploads/files`

const AddFile: React.FC = ({ navigation, route }: any) => {
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [fileForm, setFileForm] = useState({
    name: '',
    description: '',
    file: fileUpload,
    tags: '',
  })

  const [isInputActive, setIsInputActive] = useState(false)
  const [isInputActiveDescription, setIsInputActiveDescription] =
    useState(false)
  const [isInputActiveTags, setIsInputActiveTags] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [fileInfoVisible, setFileInfoVisible] = useState(false)

  const handleFilePick = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    })
    const fileUploads = file.assets
    console.log(fileUploads, 'file')

    setFileUpload(fileUploads)
    setFileForm({ ...fileForm, file: fileUploads })
    setFileInfoVisible(true)
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
    // formdata.append(`files`, file as Blob)
    // formdata.append(`title[]`, file?.name as string)
    // formdata.append(`description[]`, file?.name as string)
    // formdata.append(`isPublic[]`, switchValue ? 'true' : 'false')
    // formdata.append(`author[]`, user?.username as string)

    try {
      const formData = new FormData()
      formData.append('files', fileForm.file)
      formData.append('title', fileForm.name)
      formData.append('description', fileForm.description)
      // formData.append("tags", fileForm.tags);
      formData.append('isPublic', 'true')
      formData.append('author', 'c7e11ebd-19be-4089-8f7c-655eaa016c62')

      const response = await axios.post(url, formData, {})

      if (response.data.success) {
        navigation.navigate('TabNavigator')
      } else {
        alert('La soumission a échoué')
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de la soumission")
      console.log(error)
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
