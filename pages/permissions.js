import App from '../components/App'
import { withApollo } from '../lib/apollo'
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

export default withApollo({ ssr: true })(PermissionsPage)
