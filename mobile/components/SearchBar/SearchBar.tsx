import React, { useState } from 'react'
import { SearchBar } from '@rneui/themed'
import { View, Text, StyleSheet } from 'react-native'
import { background } from 'native-base/lib/typescript/theme/styled-system'

type SearchBarComponentProps = {}

const SwitchComponent: React.FunctionComponent<
  SearchBarComponentProps
> = () => {
  const [search, setSearch] = useState('')

  const updateSearch = (search) => {
    setSearch(search)
  }

  return (
    <View style={{ backgroundColor: 'white', width: '100%' }}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        platform="ios"
      />
    </View>
  )
}

export default SwitchComponent
