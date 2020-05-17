import React from 'react'
import Select from 'react-select'

const SortOptions = props => {
  const {
    changeHandler,
    isClearable = true,
    placeholder = 'Count',
    name = 'count',
    value
  } = props

  const options = [
    { value: 'date_DESC', label: 'Newest' },
    { value: 'date_ASC', label: 'Oldest' },
    { value: 'count_DESC', label: 'Highest count' },
    { value: 'count_ASC', label: 'Lowest count' }
  ]

  return (
    <Select
      {...{ value }}
      {...{ name }}
      {...{ isClearable }}
      {...{ placeholder }}
      onChange={changeHandler}
      options={options}
    />
  )
}

export default SortOptions
