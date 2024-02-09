import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Provider } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import DropdownMenu from '../components/SharedFiles/DropdowMenu'
import { useQuery } from '@apollo/client'
import { SHARED_ALL_URL_BY_ID } from '../Graphql/queries/ShareAllUrlsListByAuthorId.queries'
import { useAuth } from '../context/UserContext'
import { formatDate } from '../utils/common'
import { useMutation } from '@apollo/client'
import { DELETE_SHARED_URL } from '../Graphql/mutations/deleteSharedUrl.mutation'

export default function SharedFile({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false)
  const isFocused = useIsFocused()
  const { user } = useAuth()

  const { data, refetch } = useQuery(SHARED_ALL_URL_BY_ID, {
    variables: { userId: user?.id },
  })
  const dataSharedUrlByUserId = data?.SharedUrlByUserId

  const [deleteSharedUrl] = useMutation(DELETE_SHARED_URL, {
    onCompleted: () => {
      refetch()
    },
  })

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  function handleCreateFolder() {
    navigation.navigate('FileList')
  }

  function handleModify(item) {
    navigation.navigate('ListFilesSharedurl', { fileId: item.id })
    setMenuVisible(false)
  }

  function handleDelete(item) {
    if (item) {
      deleteSharedUrl({
        variables: { deleteSharedUrlId: item.id },
        onCompleted: () => {
          refetch()
        },
      })
    }
    setMenuVisible(false)
  }
  function handleItemPress(item) {
    navigation.navigate('ListFilesSharedurl', { fileId: item.id })
  }

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleCreateFolder()}>
            <Icon name="folder-plus" type="feather" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {dataSharedUrlByUserId?.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.fileItem}>
              <Icon
                name="link-variant"
                type="material-community"
                size={40}
                color="blue"
              />
              <View style={styles.fileDetails}>
                <Text style={styles.title}>{item.title.slice(14)}</Text>
                <Text style={styles.description}>
                  {item.author?.username || 'Unknown'}
                </Text>
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <DropdownMenu
                  item={item}
                  onModify={handleModify}
                  onDelete={handleDelete}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 15,
    gap: 20,
    position: 'relative',
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
  dropdownContainer: {
    position: 'relative',
  },
})
