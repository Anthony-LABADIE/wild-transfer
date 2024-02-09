import SharedFile from './SharedFile'
import React from 'react'
import { Tab, Text, TabView, Icon } from '@rneui/themed'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import FilesList from '../components/Files/FilesList'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddFile from './Link/AddFiles/AddFile'
import MyFileList from '../components/MyFile/MyFile'

const Stack = createStackNavigator()

export default function FileScreen({ navigation }) {
  const [index, setIndex] = React.useState(0)

  const Icons = [
    {
      name: 'addfile',
      type: 'antdesign',
      size: 35,
      onClick: () => handleIconClick('addfile'),
    },
    {
      name: 'file-minus',
      type: 'feather',
      size: 35,
      onClick: () => handleIconClick('file-minus'),
    },
    {
      name: 'search-outline',
      type: 'ionicon',
      size: 35,
      onClick: () => handleIconClick('search-outline'),
    },
    {
      name: 'md-download-outline',
      type: 'ionicon',
      size: 35,
      onClick: () => handleIconClick('md-download-outline'),
    },
  ]

  const handleIconClick = (name: string) => {
    switch (name) {
      case 'addfile':
        navigation.navigate('AddFile')
        break
      case 'file-minus':
        console.log('file-minus')
        break
      case 'search-outline':
        console.log('search-outline')
        break
      case 'md-download-outline':
        console.log('md-download-outline')
        break
      default:
        break
    }
  }
  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#6A2AFE',
          height: 3,
        }}
        buttonStyle={{
          backgroundColor: 'white',
        }}
      >
        <Tab.Item
          title="Mes fichiers"
          titleStyle={{ color: '#6A2AFE', fontSize: 12 }}
          icon={{ name: 'folder-outline', type: 'ionicon', color: '#6A2AFE' }}
          buttonStyle={{ backgroundColor: 'white' }}
        />
        <Tab.Item
          title="Lien partagé"
          titleStyle={{ color: '#6A2AFE', fontSize: 12 }}
          icon={{
            name: 'share-social-outline',
            type: 'ionicon',
            color: '#6A2AFE',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#FAFAFA', width: '100%' }}>
          <ScrollView>
            <View style={styles.containerIcon}>
              {Icons.map((icon, index) => (
                <TouchableOpacity onPress={icon.onClick} key={icon.name}>
                  <Icon
                    key={index}
                    name={icon.name}
                    type={icon.type}
                    size={icon.size}
                    color="black"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <MyFileList />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <SharedFile navigation={navigation} />
        </TabView.Item>
      </TabView>
    </>
  )
}

const styles = StyleSheet.create({
  containerIcon: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 45,
    padding: 30,
  },
})
