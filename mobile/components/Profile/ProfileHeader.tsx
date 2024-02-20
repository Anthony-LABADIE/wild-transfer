import { useAuth } from '../../context/UserContext'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ProfileHeader = () => {
  const { user } = useAuth()
  return (
    <>
      <View style={styles.header}></View>

      <View style={styles.profileInfo}>
        <Image
          style={styles.profilePic}
          source={require('../../assets/connection/utilisateur.png')}
        />
        <View>
          <Text style={styles.name}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
    </>
  )
}

export default ProfileHeader

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
})
