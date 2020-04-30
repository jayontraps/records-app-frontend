import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import RecordsList from '../components/RecordsList'
import FilterList from '../components/FilterList'
import Pagination from '../components/Pagination'
import { useRouter } from 'next/router'

const ClientOnlyPage = props => {
  const router = useRouter()
  return (
    <App>
      <Header />
      <InfoBox>
        ℹ️ This example shows how to disable apollos query fetching on the server.
        If you <a href="/client-only">reload</a> this page, you will see a loader
        since Apollo didn't fetch any data on the server. This allows{' '}
        <a
          href="https://nextjs.org/blog/next-9#automatic-static-optimization"
          target="_blank"
          rel="noopener noreferrer"
        >
          automatic static optimization
        </a>      
      </InfoBox>
      <Pagination  queryParams={router.query} />
      <FilterList queryParams={router.query} />
      <RecordsList queryParams={router.query} />
      <Pagination  queryParams={router.query} /> 
    </App>
  )
}

export default withApollo()(ClientOnlyPage)
