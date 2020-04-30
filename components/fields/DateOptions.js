import React from 'react'
import Select from 'react-select'

const DateOptions = props => {
  const { 
    changeHandler, 
    isClearable = true, 
    placeholder = 'Date', 
    name = 'date',
    value 
  } = props

  const dateOptions = [
    { value: 'date_DESC', label: 'sort descending' },
    { value: 'date_ASC', label: 'sort ascending' }
  ]
  
  return (
      <Select 
        {...{value}}
        {...{name}}
        {...{isClearable}} 
        {...{placeholder}} 
        onChange={changeHandler} 
        options={dateOptions} />
  )
}

export default DateOptions