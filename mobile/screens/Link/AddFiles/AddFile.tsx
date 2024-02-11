import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as DocumentPicker from 'expo-document-picker'
import styles from './styles'

const url = `${process.env.EXPO_PUBLIC_UPLOADS_API_URL}`

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

      if (file.assets.length > 0) {
        setFileForm({
          ...fileForm,
          file: file.assets[0], // Stocker les données du fichier
          name: file.assets[0].name, // Stocker le nom du fichier
        })
        setFileInfoVisible(true)
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la sélection du fichier",
        error,
      )
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

    const formData = new FormData()

    // Ajouter le fichier à FormData
    formData.append('files', {
      uri: fileForm.file.uri, // Utiliser l'URI du fichier
      name: fileForm.file.name, // Utiliser le nom du fichier
      type: fileForm.file.type, // Utiliser le type de fichier
    })

    formData.append('title', '[hey]')
    formData.append('description', "['hey']")
    formData.append('isPublic', 'true')
    formData.append('author', '[5964d43a-5cbf-48f1-b45c-88a9dbcc1e0c]')

    console.log(formData, '🔴')

    try {
      const response = await fetch('https://192.168.1.25:4000/uploads/files', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la requête HTTP')
      }

      // Vérifiez que la réponse n'est pas vide avant de la convertir en JSON
      const text = await response.text()
      const result = text ? JSON.parse(text) : null

      console.log(result, '🔴')
    } catch (error) {
      console.error('Error:', error)
      alert("Une erreur s'est produite lors de l'envoi de la requête.")
    }
  }

  // const getFiles = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://10.0.2.2:4000/uploads/download/c2097e2e-760c-40ed-a187-1773bdc621bb`,
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )

  //     const result = response.data
  //     console.log(response, '🔴')
  //   } catch (error) {
  //     console.error('Error:', error)
  //     alert("Une erreur s'est produite lors de l'envoi de la requête.")
  //   }
  // }
  const getFile = () => {
    return fetch(
      'https://192.168.1.25:4000/uploads/download/c2097e2e-760c-40ed-a187-1773bdc621bb',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête HTTP')
        }
        return response.json()
      })
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error('Erreur:', error)
        alert("Une erreur s'est produite lors de l'envoi de la requête.")
      })
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
          <TouchableOpacity style={styles.nextButton} onPress={getFile}>
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
