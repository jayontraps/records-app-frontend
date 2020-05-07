import React from 'react'
import styled from 'styled-components'
import { withRedux } from '../lib/redux'
import { compose } from 'redux'
import App from '../components/App'
import RecordsList from '../components/RecordsList'
import FilterList from '../components/FilterList'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import Dialog from '../components/Dialog'
import CreateRecordForm from '../components/CreateRecordForm'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'

const StyledPage = styled.div`
  max-width: 1080px;
  margin: 30px 0;
  .nav,
  .records-list {
    margin-bottom: 20px;
  }

  .nav {
  
  }

  .btn-group {   
    display: flex;
    justify-content: flex-end;
    button {
     background-color: ${props => props.theme.colors.active};
     border-color: ${props => props.theme.colors.active};
     color: white;
     &:hover {
      background-color: ${props => props.theme.colors.activeHover};
      border-color: ${props => props.theme.colors.activeHover};
     }
    }
  }
`

const IndexPage = props => {
  const router = useRouter()
  return (
  <App>
    <StyledPage>
      <div className="nav"> 
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
    <Dialog />
  </App>
)}

export default compose(withApollo({ ssr: true }), withRedux)(IndexPage)

// export default withApollo({ ssr: true })(IndexPage)
