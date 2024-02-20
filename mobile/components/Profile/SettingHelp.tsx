import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed'
import ProfileHeader from './ProfileHeader'

const SettingHelp = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.containerText}>
        <Text style={styles.text}>Aide</Text>
      </View>
      <View style={styles.containerRows}>
        <Text style={styles.title}>Rapport et problème</Text>
        <Icon name="md-chevron-forward" type="ionicon" style={styles.icon} />
      </View>
      <View style={styles.containerRows}>
        <Text style={styles.title}>FAQ</Text>
        <Icon name="md-chevron-forward" type="ionicon" style={styles.icon} />
      </View>
      <View style={styles.containerRows}>
        <Text style={styles.title}>Politique de confidentialité</Text>
        <Icon name="md-chevron-forward" type="ionicon" style={styles.icon} />
      </View>
    </ScrollView>
  )
}

export default SettingHelp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDECE0',
  },
  containerText: {
    alignItems: 'center',
    marginTop: 20,
  },
  containerRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
})
