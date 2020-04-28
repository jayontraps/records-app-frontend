import React from 'react'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import ErrorMessage from './ErrorMessage'
import { perPage } from '../config'


const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    recordsConnection {
      aggregate {
        count
      }
    }
  }
`




const Pagination = props => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY)
  if (error) return <ErrorMessage message="Error loading records." />
  if (loading) return <p>loading</p>
  const { page } = props
  const count = data.recordsConnection.aggregate.count
  const pages = count / perPage
  return (
    <PaginationStyles>
    <Link       
      href={{
        pathname: '/',
        query: { page: page - 1}
      }}>
        <a aria-disabled={page <= 1} className="prev">prev</a>
      </Link>
      <p>Page {props.page} of {Math.ceil(pages)}</p>
      <p>{count} items total</p>
    <Link       
      href={{
        pathname: '/',
        query: { page: page + 1}
      }}>
        <a aria-disabled={page >= Math.ceil(pages)} className="next">next</a>
      </Link>      
    </PaginationStyles>
  )
}

export default Pagination