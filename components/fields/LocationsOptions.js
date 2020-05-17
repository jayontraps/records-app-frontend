import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Select from 'react-select'

const LOCATIONS_QUERY = gql`
  query {
    locations {
      id
      site
    }
  }
`

const LocationsOptions = props => {
  const {
    isClearable,
    placeholder,
    changeHandler,
    name = 'location',
    value
  } = props
  const { loading, error, data } = useQuery(LOCATIONS_QUERY)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const locations = data.locations.map(loc => ({
    value: loc.id,
    label: loc.site
  }))

  return (
    <Select
      {...{ value }}
      {...{ name }}
      {...{ isClearable }}
      {...{ placeholder }}
      onChange={changeHandler}
      options={locations}
    />
  )
}

export default LocationsOptions
