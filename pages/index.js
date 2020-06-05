import React from 'react'
import { withRedux } from '../lib/redux'
import { compose } from 'redux'
import App from '../components/App'
import RecordsList from '../components/RecordsList'
import FilterList from '../components/FilterList'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import Dialog from '../components/Dialog'
import RecordForm from '../components/RecordForm'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'
import Header from '../components/Header'

const IndexPage = props => {
  const router = useRouter()
  return (
    <App>
      <Header />
      <div className="nav">
        <div className="btn-group">
          <div className="btn">
            <Modal buttonText="Create record">
              <RecordForm queryParams={router.query} />
            </Modal>
          </div>
        </div>
      </div>
      <FilterList queryParams={router.query} />
      <RecordsList queryParams={router.query} />
      <Pagination queryParams={router.query} />
      <Dialog />
    </App>
  )
}

export default compose(withApollo({ ssr: true }), withRedux)(IndexPage)

// export default withApollo({ ssr: true })(IndexPage)
