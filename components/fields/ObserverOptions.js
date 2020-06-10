import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'

const USERS_QUERY = gql`
  query {
    users {
      name
      id
    }
  }
`

const ObserverOptions = props => {
  const {
    changeHandler,
    fieldName,
    isClearable,
    name = 'author',
    value
  } = props
  const { loading, error, data } = useQuery(USERS_QUERY)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const observers = data.users.map(observer => ({
    value: observer.id,
    label: observer.name
  }))
  return (
    <Select
      {...{ value }}
      {...{ name }}
      {...{ isClearable }}
      {...{ fieldName }}
      onChange={changeHandler}
      options={observers}
    />
  )
}

export default ObserverOptions
