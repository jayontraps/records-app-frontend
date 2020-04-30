import App from '../components/App'
import Header from '../components/Header'
import RecordsList from '../components/RecordsList'
import FilterList from '../components/FilterList'
import Pagination from '../components/Pagination'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'


const IndexPage = props => {
  const router = useRouter()
  return (
  <App>
    <Header />    
    <Pagination  queryParams={router.query} />
    <FilterList queryParams={router.query} />
    <RecordsList queryParams={router.query} />
    <Pagination  queryParams={router.query} /> 
  </App>
)}

export default withApollo({ ssr: true })(IndexPage)
