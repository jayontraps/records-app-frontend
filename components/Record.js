import React from 'react'
import styled from "styled-components"
import { format } from 'date-fns';
import { get } from 'lodash'

const StyledRecord = styled.div`
  .species { 
    grid-area: species; 
  }
  .observer { 
    grid-area: observer; 
  }
  .count { 
    grid-area: count; 
  }
  .date { 
    grid-area: date; 
  }
  .location { 
    grid-area: location; 
  }
  .notes { 
    grid-area: notes; 
  }
  .breeding__code { 
    grid-area: breeding__code; 
  }

  display: grid;
  grid-gap: 20px;
  grid-template-areas:
  "species observer count date location breeding__code notes";
  grid-template-columns: 1fr 1fr 20px 1fr 1fr 1fr 300px;
  margin-bottom: 20px;

`

const Record = ({record}) => {
    const { 
      species: {
        name
      },
      location: {
        site
      },
      status,
      author: {
        name: authorrName
      }, 
      legacyObserver,
      count,
      date,
      notes,
      breeding_code
     } = record
     const breedingCode = get(breeding_code, 'code', '')
     const breedingDescription = get(breeding_code, 'description', '')
    return (
    <StyledRecord>
      <div className="species">{name}</div>      
      <div className="observer">
      {authorrName === 'Legacy' ? `${legacyObserver}: legacy` : authorrName}</div>
      <div className="count">{count}</div>
      <div className="date">{format(new Date(date), 'MM/dd/yyyy')}</div>
      <div className="location">{site}</div>      
      <div className="breeding__code">{breedingCode} : {breedingDescription}</div>
      <div className="notes">{notes}</div>
    </StyledRecord>
  )}

  export default Record