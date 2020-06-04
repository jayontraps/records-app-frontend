import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Signup from '../components/Signup'

const SignupPage = () => {
  return (
    <App>
      <Signup />
    </App>
  )
}

export default withApollo({ ssr: true })(SignupPage)
