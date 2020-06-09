import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Header from '../components/Header'
import PleaseSignIn from '../components/PleaseSignIn'

const SignupPage = () => {
  return (
    <App>
      <Header />
      <PleaseSignIn>
        <h1>Your account...</h1>
      </PleaseSignIn>
    </App>
  )
}

export default withApollo({ ssr: true })(SignupPage)
