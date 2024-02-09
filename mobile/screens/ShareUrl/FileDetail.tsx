import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { FILEBYID } from '../../Graphql/queries/FileById.queries'
import { DELETE_FILE } from '../../Graphql/mutations/deleteFile.mutation'
import { useMutation } from '@apollo/client'

const FileDetail = ({ route, navigation }) => {
  const { fileId } = route.params
  const { error, loading, data } = useQuery(FILEBYID, {
    variables: { fileByIdId: fileId },
  })
  const dataFileById = data?.FileById

  const [deleteFile] = useMutation(DELETE_FILE, {
    variables: { deleteFileId: fileId },
    onCompleted: () => {
      navigation.navigate('FileList')
    },
  })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const renderFilePreview = () => {
    if (dataFileById.format === 'svg_pipe') {
      return (
        <Image
          source={{ uri: dataFileById.url }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      )
    } else if (dataFileById.format === 'video') {
      return <Text>Prévisualisation vidéo</Text>
    } else {
      return <Text>Prévisualisation non disponible</Text>
    }
  }

  const handleDelete = () => {
    deleteFile()
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>File Details</Text>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{dataFileById.title}</Text>
      </View>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{dataFileById.description}</Text>
      </View>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Author:</Text>
        <Text style={styles.value}>{dataFileById.author?.username}</Text>
      </View>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Format:</Text>
        <Text style={styles.value}>{dataFileById.format}</Text>
      </View>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>{dataFileById.createdAt}</Text>
      </View>

      <View style={styles.propertyContainer}>
        <Text style={styles.label}>Updated At:</Text>
        <Text style={styles.value}>{dataFileById.updatedAt}</Text>
      </View>

      <View style={styles.previewContainer}>{renderFilePreview()}</View>

      <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Télécharger</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Supprimer</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  propertyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#D2042D',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default FileDetail
