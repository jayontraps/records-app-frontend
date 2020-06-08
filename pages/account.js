import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Header from '../components/Header'

const SignupPage = () => {
  return (
    <App>
      <Header />
    </App>
  )
}

export default withApollo({ ssr: true })(SignupPage)
