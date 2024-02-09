import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'

const uri = process.env.EXPO_PUBLIC_API_URL

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = createHttpLink({
  uri,
  credentials: 'same-origin',
})

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: authLink.concat(httpLink),
})

export default client
