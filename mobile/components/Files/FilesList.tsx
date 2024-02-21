import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Center, NativeBaseProvider } from 'native-base'
import DropdownMenu from './DropdownMenu'
import { FILEPUBLIC } from '../../Graphql/queries/File.queries'
import { useQuery } from '@apollo/client'
import { RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type FileData = {
  title: string
  description: string
  format: string
  size: string
  createdAt: string
  updatedAt: string
  userId: string
}

export default function PublicFilesList() {
  const [data, setData] = useState<FileData[]>([])
  const { data: filePublic, refetch } = useQuery(FILEPUBLIC)
  const [refreshing, setRefreshing] = useState(false)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  useEffect(() => {
    if (filePublic && filePublic.FileListPublic) {
      setData(filePublic.FileListPublic)
    }
  }, [filePublic])

  const getImageSource = (fileType) => {
    switch (true) {
      case /pdf/.test(fileType):
        return require('../../assets/file/pdf.png')

      case /image|png|jpg|jpeg|gif/.test(fileType):
        return require('../../assets/file/png.png')

      case /audio|mp3|wav|flac/.test(fileType):
        return require('../../assets/file/mp3.jpg')

      case /video|mp4|avi|mkv/.test(fileType):
        return require('../../assets/file/mp4.png')

      case /text|txt|md/.test(fileType):
        return require('../../assets/file/txt.png')

      default:
        return require('../../assets/file/file.png')
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} />}
    >
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {}}>
          <View style={styles.fileItem}>
            <Image
              style={styles.fileIcon}
              source={getImageSource(item.format)}
            />
            <View style={styles.fileDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>{item.createdAt}</Text>
              <Text style={styles.user}>User: {item.userId}</Text>
            </View>
            <NativeBaseProvider>
              <Center style={styles.dropdownContainer}>
                <DropdownMenu />
              </Center>
            </NativeBaseProvider>
          </View>
        </TouchableOpacity>
      ))}
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
  dropdownContainer: {
    marginRight: 20,
  },
})
