import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Menu, IconButton } from 'react-native-paper'
import { Icon } from 'react-native-elements'

type Props = {
  item?: any
  onModify: (item: any) => void
  onDelete: (item: any) => void
}

export default function DropdownMenu({ item, onModify, onDelete }: Props) {
  const [menuVisible, setMenuVisible] = useState(false)

  function handleOptions() {
    setMenuVisible(true)
  }

  function handleCloseMenu() {
    setMenuVisible(false)
  }

  return (
    <Menu
      style={styles.anchor}
      visible={menuVisible}
      onDismiss={handleCloseMenu}
      anchor={
        <IconButton
          icon={() => (
            <Icon
              name="dots-vertical"
              type="material-community"
              size={30}
              color="black"
            />
          )}
          onPress={handleOptions}
        />
      }
    >
      <Menu.Item onPress={() => onModify(item)} title="Modifier" />
      <Menu.Item onPress={() => onDelete(item)} title="Supprimer" />
    </Menu>
  )
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    marginRight: 5,
    transform: [{ translateY: -90 }],
  },
})
