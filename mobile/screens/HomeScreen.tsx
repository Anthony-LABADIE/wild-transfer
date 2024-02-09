import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchComponent from '../components/SearchBar/SearchBar'
import PublicFilesList from '../components/Files/FilesList'

const Homepages = () => {
  return (
    <>
      <View style={styles.containerSearch}>
        <View style={styles.search}>
          <SwitchComponent />
        </View>
      </View>
      <View style={styles.containerFile}>
        <PublicFilesList />
      </View>
    </>
  )
}

export default Homepages

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: 'white',
    height: '15%',
  },
  containerFile: {
    height: '85%',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
})
