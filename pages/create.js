import App from '../components/App'
import Header from '../components/Header'
import CreateRecordForm from '../components/CreateRecordForm'
import { withApollo } from '../lib/apollo'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledPage = styled.div`
  margin: 30px 0;
`





const IndexPage = () => {
  const router = useRouter()
  return (
    <App>
      <Header />
      <StyledPage>
        <CreateRecordForm queryParams={router.query} />
      </StyledPage>
    </App>
  )
}

export default withApollo({ ssr: true })(IndexPage)
