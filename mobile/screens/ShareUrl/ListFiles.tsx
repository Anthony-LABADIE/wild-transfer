import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { CheckBox } from 'react-native-elements'

import { FILELISTBYAUTHORID } from '../../Graphql/queries/FileByIdAuthor.queries'
import { useQuery } from '@apollo/client'
import { useAuth } from '../../context/UserContext'
import ModalSendEmail from '../../components/SharedFiles/ModalSendEmail'
import { Provider } from 'react-native-paper'
import { getFileIcon } from '../../utils/common'

export default function PublicFilesList() {
  const { user } = useAuth()
  const { loading, error, data } = useQuery(FILELISTBYAUTHORID, {
    variables: { id: user?.id },
  })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dataFileListByAuthorId = data?.FileListByAuthorId
  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((selectedId) => selectedId !== id)
      } else {
        return [...prevIds, id]
      }
    })
  }
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const renderFiles = () => {
    return dataFileListByAuthorId?.map((item, index) => (
      <Provider key={index}>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.fileItem}>
              <CheckBox
                checked={selectedIds.includes(item.id)}
                onPress={() => handleCheckboxChange(item.id)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#6A2AFE"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
              <Image
                style={styles.fileIcon}
                source={getFileIcon(item.format)}
              />
              <View style={styles.fileDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.createdAt}</Text>
                <Text style={styles.user}>User: {item.userId}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Provider>
    ))
  }

  return (
    <ScrollView style={styles.container}>
      {renderFiles()}
      {selectedIds.length > 0 && (
        <TouchableOpacity onPress={() => console.log('Bouton cliqué')}>
          <View>
            <Animatable.View
              animation="pulse"
              iterationCount={1}
              duration={500}
              easing="ease-out"
              style={styles.nextButtonContainer}
            >
              <TouchableOpacity onPress={toggleModal} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Créer</Text>
                <Image
                  style={styles.imgFuse}
                  source={require('../../assets/Link/fuse.png')}
                />
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </TouchableOpacity>
      )}
      <ModalSendEmail
        visible={isModalVisible}
        onClose={toggleModal}
        selectedIds={selectedIds}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    color: '#6A2AFE',
  },
  fileIcon: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  fileDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'grey',
  },
  date: {
    color: 'grey',
  },
  user: {
    color: 'grey',
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
  nextButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#6A2AFE',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2,
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
  imgFuse: {
    marginLeft: 15,
  },
})
