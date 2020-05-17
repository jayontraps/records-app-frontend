import React from 'react'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import ErrorMessage from './ErrorMessage'
import { perPage } from '../config'
import { getRecordsVariables } from '../queries'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($where: RecordWhereInput) {
    recordsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`

const Loading = () => (
  <PaginationStyles className="loading">
    <p>Loading..</p>
  </PaginationStyles>
)

const Pagination = props => {
  const { queryParams } = props
  const variables = getRecordsVariables(queryParams)
  const { loading, error, data } = useQuery(PAGINATION_QUERY, { variables })

  if (error) return <ErrorMessage message="Error loading records." />
  if (loading) return <Loading />

  const page = parseFloat(queryParams.page) || 1
  const count = data.recordsConnection.aggregate.count
  const pages = Math.ceil(count / perPage)

  return (
    <PaginationStyles>
      <Link
        href={{
          pathname: '/',
          query: {
            ...queryParams,
            page: page - 1
          }
        }}
      >
        <a aria-disabled={page <= 1} className="prev">
          prev
        </a>
      </Link>
      <p>
        Page {page} of {pages}
      </p>
      <p>{count} records total</p>
      <Link
        href={{
          pathname: '/',
          query: {
            ...queryParams,
            page: page + 1
          }
        }}
      >
        <a aria-disabled={page >= pages} className="next">
          next
        </a>
      </Link>
    </PaginationStyles>
  )
}

export default Pagination
