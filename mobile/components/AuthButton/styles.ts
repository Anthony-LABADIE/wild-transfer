import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  buttonContainer: {
    width: '70%',
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 5,
  },
  buttonLogo: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 15,
    marginTop: 8,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 16,
  },
})

export default styles
