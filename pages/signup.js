import App from '../components/App'
import { withApollo } from '../lib/apollo'
import { compose } from 'redux'
import { withRedux } from '../lib/redux'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Header from '../components/Header'

const SignupPage = () => {
  return (
    <App>
      <Header />
      <Signin />
      <Signup />
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(SignupPage)
