import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Title: React.FC = () => {
  return (
    <Text style={styles.title}>
      <Text style={styles.wildText}>Wild</Text>
      <Text style={styles.transferText}>Transfert</Text>
    </Text>
  )
}

export default Title
