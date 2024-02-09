import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Menu, Box, Pressable } from 'native-base'

export default function DropdownMenu() {
  return (
    <Box w="100%" alignItems="center">
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Text style={styles.more}>...</Text>
            </Pressable>
          )
        }}
      >
        <Menu.Item>Select</Menu.Item>
        <Menu.Item>Share</Menu.Item>
        <Menu.Item>Open</Menu.Item>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item>Add to Favourites</Menu.Item>
      </Menu>
    </Box>
  )
}

const styles = StyleSheet.create({
  more: {
    fontSize: 30,
    color: 'grey',
  },
})
