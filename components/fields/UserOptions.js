import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select'
import { GET_USERS } from '../../queries'

const UserOptions = props => {
  const { 
    changeHandler, 
    isClearable, 
    placeholder, 
    name,
    value } = props
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  const users = data.users.map(user => ({
    value: user.id,
    label: user.name
  }))
  
  return (
      <Select 
        {...{value}}
        {...{name}}
        {...{isClearable}} 
        {...{placeholder}} 
        onChange={changeHandler} 
        options={users} />
  )
}

export default UserOptions