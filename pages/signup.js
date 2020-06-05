import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Signup from '../components/Signup'
import Header from '../components/Header'

const SignupPage = () => {
  return (
    <App>
      <Header />
      <Signup />
    </App>
  )
}

export default withApollo({ ssr: true })(SignupPage)
