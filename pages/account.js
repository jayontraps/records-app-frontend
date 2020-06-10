import App from '../components/App'
import { compose } from 'redux'
import { withApollo } from '../lib/apollo'
import { withRedux } from '../lib/redux'
import Header from '../components/Header'
import PleaseSignIn from '../components/PleaseSignIn'

const AccountPage = () => {
  return (
    <App>
      <Header />
      <PleaseSignIn>
        <h1>Your account...</h1>
      </PleaseSignIn>
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(AccountPage)
