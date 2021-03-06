import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Select from 'react-select'
import { GET_SPECIES } from '../../queries'

const SpeciesOptions = props => {
  const {
    changeHandler,
    speciesClass,
    isClearable,
    placeholder,
    name,
    value
  } = props

  let variables = {}

  if (speciesClass) {
    variables = {
      where: {
        classification: {
          id: speciesClass.value
        }
      }
    }
  }

  const { loading, error, data } = useQuery(GET_SPECIES, { variables })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const species = data.specieses.map(species => ({
    value: species.id,
    label: species.name
  }))
  return (
    <Select
      {...{ value }}
      {...{ name }}
      {...{ isClearable }}
      {...{ placeholder }}
      onChange={changeHandler}
      options={species}
    />
  )
}

export default SpeciesOptions
