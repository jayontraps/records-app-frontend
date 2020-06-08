import { useRouter } from 'next/router'
import { compose } from 'redux'
import { withApollo } from '../lib/apollo'
import { withRedux } from '../lib/redux'
import App from '../components/App'
import RecordForm from '../components/RecordForm'
import Header from '../components/Header'

const IndexPage = () => {
  const router = useRouter()
  return (
    <App>
      <Header />
      <RecordForm
        setOpen={() => {
          console.log('setOpen')
        }}
        queryParams={router.query}
      />
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(IndexPage)

// export default withApollo({ ssr: true })(IndexPage)
