import App from '../components/App'
import Header from '../components/Header'
import CreateRecordForm from '../components/CreateRecordForm'
import { withApollo } from '../lib/apollo'





const IndexPage = () => (
  <App>
    <Header />
    <CreateRecordForm />
  </App>
)

export default withApollo({ ssr: true })(IndexPage)
