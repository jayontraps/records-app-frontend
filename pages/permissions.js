import App from '../components/App'
import { compose } from 'redux'
import { withApollo } from '../lib/apollo'
import { withRedux } from '../lib/redux'
import Header from '../components/Header'
import PleaseSignIn from '../components/PleaseSignIn'
import Permissions from '../components/Permissions'

const PermissionsPage = () => {
  return (
    <App>
      <Header />
      <PleaseSignIn>
        <Permissions />
      </PleaseSignIn>
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(PermissionsPage)
