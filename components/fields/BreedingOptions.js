import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components'
import gql from 'graphql-tag'
import { capitalize } from '../../utils'

const StyledBreedingOptions = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background: whitesmoke;
  border: 1px solid #e8e8e8;

  .breeding__option {
    margin-bottom: 10px;    
  }  
  .breeding__category {
    font-weight: normal;
    margin-bottom: 10px;
  }

  .breeding__label {
    display: flex;
    align-items: baseline;
  }
  .breeding__input,
  .breeding__code {
    margin-right: 10px
  }
  .breeding__code {
    font-weight: bold;
  }
  .breeding__description {
    font-size: .8rem;
    color: ${props => props.theme.colors.description};
  }
`

const categories = ['possible', 'probable', 'confirmed', 'non']

const BREEDING_CODES_QUERY = gql`
  query getBreedingCodes($where: BreedingCodeWhereInput) {
    breedingCodes(where: $where) {
      id
      code
      group
      description
    }
  }
  ` 

const BreedingOptions = props => {
  return categories.map((category, index) =>{ 
    const title = `${capitalize(category)} breeding`
    return (
    <StyledBreedingOptions key={`${category}-${index}`}>
      <h4 className="breeding__category">{title}</h4>
      <BreedingCategory category={category} {...props} />
    </StyledBreedingOptions>
  )})
}

  const BreedingCategory = props => {
    const { category, changeHandler, currentBreedingCode } = props
    const { loading, error, data } = useQuery(
      BREEDING_CODES_QUERY,
      {
        variables: {
          where: {
            group_contains: category
          }
        }
      });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const breedingCodes = data.breedingCodes
    return (
      <div>
        {breedingCodes.map(breedingCode => (     
          <div key={`code-${breedingCode.code}`} className="breeding__option">
            <label className="breeding__label" key={breedingCode.id}>
              <input 
                className="breeding__input"
                onChange={(e) => { changeHandler(e) }} 
                type="radio" 
                name="breeding_codes" 
                value={breedingCode.id}
                checked={breedingCode.id === currentBreedingCode}                        
                />
              <span className="breeding__code">{breedingCode.code}</span>
              <span className="breeding__description">{breedingCode.description}</span>
            </label>           
          </div>  
        ))}
      </div>
    );
  }

  export default BreedingOptions