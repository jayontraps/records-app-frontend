import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select'
import gql from 'graphql-tag'

const CLASSES_QUERY = gql`
  query {
    classifications {
      name
      id
    }
  }
`

const ClassesOptions = props => {
    const { 
      changeHandler,
      name, 
      value,
      isClearable,
      placeholder } = props

    const { loading, error, data } = useQuery(CLASSES_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const classes = data.classifications.map(classification => ({
      value: classification.id,
      label: classification.name
    }))

    return (
      <div className="select__class">
        <Select
          {...{value}}
          {...{name}}
          {...{isClearable}}
          {...{placeholder}}
          onChange={changeHandler}
          options={classes} />
      </div>
    );
  }

  export default ClassesOptions