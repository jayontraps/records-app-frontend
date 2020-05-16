import { useRouter } from 'next/router'
import styled from 'styled-components'
import App from '../components/App'
import Header from '../components/Header'
import RecordForm from '../components/RecordForm'
import ExpandPanel from '../components/ExpandPanel'
import BreedingOptions from '../components/fields/BreedingOptions'
import { withApollo } from '../lib/apollo'

const StyledPage = styled.div`
  margin: 30px 0;
`



const IndexPage = () => {
  const router = useRouter()
  return (
    <App>
      <Header />
      <StyledPage>        
        <RecordForm setOpen={() => {console.log('setOpen')}} queryParams={router.query} />
      </StyledPage>
    </App>
  )
}

export default withApollo({ ssr: true })(IndexPage)
