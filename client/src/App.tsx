import { BrowserRouter as Router } from 'react-router-dom'

import Transition from './Transition'
import UserContextProvider from './context/UserContext.tsx'

function App() {
  return (
    <>
      <Router>
        <UserContextProvider>
          <Transition />
        </UserContextProvider>
      </Router>
    </>
  )
}

export default App
