import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select'
import { GET_SPECIES } from '../../queries'

const SpeciesOptions = props => {
  const { changeHandler, speciesClass } = props
  const { loading, error, data } = useQuery(
    GET_SPECIES,
    {
      variables: { 
        where: {
          class: { 
            id: speciesClass
          }
        }},
    });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const species = data.specieses.map(species => ({
    value: species.id,
    label: species.name
  }))
  return <Select onChange={changeHandler} options={species} />
}

export default SpeciesOptions