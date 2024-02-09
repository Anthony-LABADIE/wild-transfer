import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FDECE0',
  },
  input: {
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#E3E5E5',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  privacytext: {
    marginTop: 60,
    width: '90%',
    marginLeft: 20,
  },
  termsText: {
    color: '#6A2AFE',
  },
  signupButton: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    backgroundColor: '#6A2AFE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  signuptxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
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
