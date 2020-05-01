import styled from 'styled-components'
import App from '../components/App'
import Header from '../components/Header'
import RecordsList from '../components/RecordsList'
import FilterList from '../components/FilterList'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import CreateRecordForm from '../components/CreateRecordFormFunc'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'

const StyledPage = styled.div`
  margin: 30px 0;

  .nav,
  .records-list {
    margin-bottom: 20px;
  }

  .nav {
    display: flex;
    justify-content: space-between;    
  }

  .btn-group {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    button {
      padding: ${props => props.theme.list.spacing.vertical};
      border-radius: ${props => props.theme.borderRadius};
    }
  }
  

`


const IndexPage = props => {
  const router = useRouter()
  return (
  <App>
    <Header />  
    <StyledPage>
      <div className="nav">
        <Pagination queryParams={router.query} />
        <div className="btn-group">
          <div className="btn">
            <Modal buttonText="Create record">
              <CreateRecordForm queryParams={router.query} />
            </Modal>
          </div>          
        </div>              
      </div>    
      <FilterList queryParams={router.query} />
      <RecordsList queryParams={router.query} />
      <Pagination  queryParams={router.query} />     
    </StyledPage>
  </App>
)}

export default withApollo({ ssr: true })(IndexPage)
