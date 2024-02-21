import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, Switch } from 'react-native'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import { CREATE_FILE } from '../../../Graphql/mutations/file.mutation'
import * as DocumentPicker from 'expo-document-picker'
import styles from './styles'
import { File } from 'buffer'
import { useAuth } from '../../../context/UserContext'
import { useMutation } from '@apollo/client'

const url = `${process.env.EXPO_PUBLIC_UPLOADS_API_URL}/uploads/files`
export interface dataResult {
  CreateFile: {
    author: {
      username: string
    }
    description: string
    id: string
    createdAt: string
    duration: string
    format: string
    isPublic: string
    title: string
    url: string
  }
}

const AddFile: React.FC = ({ navigation }: any) => {
  const [createFile] = useMutation(CREATE_FILE, {
    fetchPolicy: 'no-cache',
  })
  const { user } = useAuth()
  const [fileForm, setFileForm] = useState<DocumentPicker.DocumentPickerAsset[]>([]) 
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [fileInfoVisible, setFileInfoVisible] = useState(false)

  const handleFilePick = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    })
   if (file.assets) {
     const fileUploads = file.assets
     setFileForm(fileUploads)
     setFileInfoVisible(true)
   }
  }

  const handleSwitchChange = (value) => {
    setIsSwitchOn(value)
  }

  const handleNext = async () => {
    if (!fileForm) {
      alert('Veuillez sélectionner un fichier.')
      return
    }

    const formData = new FormData()

    for (const file of fileForm) {
      formData.append('files', {
        name: file.name,
        type: file.mimeType,
        uri: file.uri,
      })

      formData.append(`title[]`, file.name)
      formData.append(`description[]`, file.name)
      formData.append(`isPublic[]`, 'true')
      formData.append(`author[]`, user?.username)
    }
    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
        transformRequest: (data: FormData) => {
          return data
        },
      })
      if (response.status === 200) {
        for (const file of response.data) {
          try {
            const { data } = await createFile({
              variables: { fileToCreate: file },
            })
            console.log('data', data)
          } catch (error) {
            console.error('CREATE_FILE Error:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
   navigation.navigate('TabNavigator', { refresh: true })
  }

  return (
    <Animatable.View
      animation="slideInUp"
      duration={1000}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ajouter un fichier</Text>
        <Text style={styles.Subtitle}>
          Veuillez sélectionner un fichier à ajouter
        </Text>
        <TouchableOpacity style={styles.pickButton} onPress={handleFilePick}>
          <Text style={styles.pickButtonText}>Sélectionner un fichier</Text>
        </TouchableOpacity>

        {fileInfoVisible && (
          <Animatable.View style={styles.fileInfoContainer}>
            <Text style={styles.fileInfo}>Nom: {fileForm[0].name}</Text>
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
            <Text style={styles.nextButtonText}>Télécharger</Text>
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
