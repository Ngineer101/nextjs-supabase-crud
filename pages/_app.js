import '../styles/globals.css'
import { UserContextProvider } from '../utils/user-context'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
