import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { CREATE_SHARED_URL } from '../../Graphql/mutations/sharedUrl.mutation'
import { useMutation } from '@apollo/client'
import { useAuth } from '../../context/UserContext'

type ModalSendEmailProps = {
  visible: boolean
  onClose: () => void
  selectedIds: string[]
}

const ModalSendEmail: React.FC<ModalSendEmailProps> = ({
  visible,
  onClose,
  selectedIds,
}) => {
  const { user } = useAuth()
  const [emailTo, setEmailTo] = useState('')
  const [title, setTitle] = useState('')

  const [createSharedUrl] = useMutation(CREATE_SHARED_URL, {
    fetchPolicy: 'no-cache',
  })

  const handleCreateSharedUrl = async () => {
    const { data } = await createSharedUrl({
      variables: {
        sharedUrlToCreateWithFilesAndUsers: {
          authorId: user?.id,
          emails: [emailTo],
          title: title,
          filesIds: selectedIds,
        },
      },
    })
    console.log('data', data)
  }
  const handleSubmit = () => {
    handleCreateSharedUrl()
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Création lien partagé</Text>
          <TextInput
            style={styles.input}
            placeholder="Envoyé à"
            value={emailTo}
            onChangeText={(text) => setEmailTo(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: '#6A2AFE',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ModalSendEmail
