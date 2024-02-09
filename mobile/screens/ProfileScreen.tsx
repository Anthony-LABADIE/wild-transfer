import { useAuth } from '../context/UserContext'
import ProfileHeader from '../components/Profile/ProfileHeader'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native'

export default function ProfileScreen({ navigation }) {
  const { signOut } = useAuth()
  const onePressProfile = () => {
    navigation.navigate('SettingProfile')
  }

  const onePressPassword = () => {
    navigation.navigate('SettingPassword')
  }
  const onePressNotification = () => {
    navigation.navigate('SettingNotification')
  }
  const onePressHelp = () => {
    navigation.navigate('SettingHelp')
  }
  const onPressLogOutPopPup = () => {
    return Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => signOut(),
        },
      ],

      { cancelable: false },
    )
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.button} onPress={onePressProfile}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/user.png')}
            />
            <Text style={styles.buttonText}>See Profile</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onePressPassword}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/lock.png')}
            />
            <Text style={styles.buttonText}>Password</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onePressNotification}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/bell.png')}
            />
            <Text style={styles.buttonText}>Notifications</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More informations</Text>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/star.png')}
            />
            <Text style={styles.buttonText}>Rate & Review</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onePressHelp}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/question.png')}
            />
            <Text style={styles.buttonText}>Help</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={onPressLogOutPopPup}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/connection/logout.png')}
            />
            <Text style={styles.buttonText}>Log out</Text>
          </View>
          <Image
            style={styles.chevronIcon}
            source={require('../assets/connection/chevron.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  section: {
    marginVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
})
