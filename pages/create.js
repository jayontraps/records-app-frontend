import { useRouter } from 'next/router'
import styled from 'styled-components'
import { compose } from 'redux'
import { withApollo } from '../lib/apollo'
import { withRedux } from '../lib/redux'
import App from '../components/App'
import RecordForm from '../components/RecordForm'

const StyledPage = styled.div`
  margin: 30px 0;
`

const IndexPage = () => {
  const router = useRouter()
  return (
    <App>
      <StyledPage>
        <RecordForm
          setOpen={() => {
            console.log('setOpen')
          }}
          queryParams={router.query}
        />
      </StyledPage>
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(IndexPage)

// export default withApollo({ ssr: true })(IndexPage)
