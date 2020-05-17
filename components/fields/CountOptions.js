import React from 'react'
import Select from 'react-select'

const CountOptions = props => {
  const {
    changeHandler,
    isClearable = true,
    placeholder = 'Count',
    name = 'count',
    value
  } = props

  const countOptions = [
    { value: 'count_DESC', label: 'high to low' },
    { value: 'count_ASC', label: 'low to high' }
  ]

  return (
    <Select
      {...{ value }}
      {...{ name }}
      {...{ isClearable }}
      {...{ placeholder }}
      onChange={changeHandler}
      options={countOptions}
    />
  )
}

export default CountOptions
