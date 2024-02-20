import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ProfileHeader from './ProfileHeader'
import { Switch } from 'react-native'

const SettingNotification = () => {
  const [isEnabledAll, setIsEnabledAll] = React.useState(false)
  const [isEnabledEmail, setIsEnabledEmail] = React.useState(false)
  const [isEnabledSMS, setIsEnabledSMS] = React.useState(false)
  const toggleSwitch = () => setIsEnabledAll((previousState) => !previousState)
  const toggleSwitchEmail = () =>
    setIsEnabledEmail((previousState) => !previousState)
  const toggleSwitchSMS = () =>
    setIsEnabledSMS((previousState) => !previousState)

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.containerText}>
        <Text style={styles.text}>Modifier vos notifications</Text>
      </View>
      <View style={styles.containerInput}>
        <View style={styles.containerSwitch}>
          <Text style={styles.textSwitch}>Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#abb8de' }}
            thumbColor={isEnabledAll ? '#6A2AFE' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabledAll}
            style={styles.switch}
          />
        </View>
        <View style={styles.containerSwitch}>
          <Text style={styles.textSwitch}>Email</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#abb8de' }}
            thumbColor={isEnabledEmail ? '#6A2AFE' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchEmail}
            value={isEnabledEmail}
            style={styles.switch}
          />
        </View>
        <View style={styles.containerSwitch}>
          <Text style={styles.textSwitch}>SMS</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#abb8de' }}
            thumbColor={isEnabledSMS ? '#6A2AFE' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSMS}
            value={isEnabledSMS}
            style={styles.switch}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingNotification

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDECE0',
    flex: 1,
    padding: 20,
  },
  containerText: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerInput: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  containerSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textSwitch: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
})
