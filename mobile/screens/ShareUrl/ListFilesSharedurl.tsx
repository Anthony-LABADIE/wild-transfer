import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { GETSHAREDURLBYID } from '../../Graphql/queries/GetSharedUrlByIdWithRelations.queries'
import { Provider } from 'react-native-paper'
import { getFileIcon } from '../../utils/common'

const ListFilesSharedurl = ({ route, navigation }) => {
  const { fileId } = route.params

  const { error, loading, data } = useQuery(GETSHAREDURLBYID, {
    variables: { sharedUrlByIdId: fileId },
  })
  const dataSharedUrlById = data?.SharedUrlById.files

  function handleItemPress(item) {
    // Navigate to ListFilesSharedurl with the selected item's ID
    navigation.navigate('FileDetail', { fileId: item.id })
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <ScrollView style={styles.fileContainer}>
      {dataSharedUrlById?.map((item, index) => (
        <Provider key={index}>
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.fileItem}>
              <Image
                style={styles.fileIcon}
                source={getFileIcon(item.format)}
              />
              <View style={styles.fileDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Provider>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fileContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
})

export default ListFilesSharedurl
