import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select'
import { GET_USER } from '../../queries'

const UserOptions = props => {
  const { changeHandler, isClearable, placeholder, name } = props
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  const users = data.users.map(user => ({
    value: user.id,
    label: user.name
  }))
  
  return (
      <Select 
        {...{name}}
        {...{isClearable}} 
        {...{placeholder}} 
        onChange={changeHandler} 
        options={users} />
  )
}

export default UserOptions