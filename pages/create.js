import App from '../components/App'
import Header from '../components/Header'
import CreateRecordForm from '../components/CreateRecordFormFunc'
import { withApollo } from '../lib/apollo'
import styled from 'styled-components'

const StyledPage = styled.div`
  margin: 30px 0;
`





const IndexPage = () => (
  <App>
    <Header />
    <StyledPage>
      <CreateRecordForm />
    </StyledPage>
  </App>
)

export default withApollo({ ssr: true })(IndexPage)
