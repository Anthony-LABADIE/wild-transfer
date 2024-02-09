import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#6A2AFE',
  },
  Subtitle: {
    fontSize: 20,
    paddingBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputActive: {
    borderColor: '#6A2AFE',
    height: 80,
    textAlignVertical: 'top',
  },
  pickButton: {
    backgroundColor: '#6A2AFE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#6A2AFE',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#6A2AFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imgFuse: {
    marginLeft: 15,
  },
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  fileInfoText: {
    fontSize: 16,
    color: 'black',
  },
  fileInfoContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6A2AFE',
    borderRadius: 8,
  },
  fileInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})

export default styles
