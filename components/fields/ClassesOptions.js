import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'

const CLASSES_QUERY = gql`
  query {
    classes {
      name
      id
    }
  }
`

const ClassesOptions = props => {
    const { changeHandler, currentClassificationId } = props
    const { loading, error, data } = useQuery(CLASSES_QUERY);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const classes = data.classes
    return (
      <div className="select__class">
        {classes.map(cl => (       
          <label key={cl.id}>
            <input 
              onChange={(e) => { changeHandler(e) }} 
              type="radio" 
              name="class" 
              value={cl.id}
              checked={cl.id === currentClassificationId}                        
              />
            {cl.name}
          </label>           
        ))}
      </div>
    );
  }

  export default ClassesOptions