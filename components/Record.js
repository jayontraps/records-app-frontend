import React from 'react'
import styled from "styled-components"
import { format } from 'date-fns';
import { get } from 'lodash'
import StyledRecord from './styles/StyledRecord'

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
    <StyledRecord className="record">
      <div className="cell species">{name}</div>      
      <div className={`cell observer ${authorrName === 'Legacy' ? 'legacy-observer' : ''}`}>
      {authorrName === 'Legacy' ? `${legacyObserver}` : authorrName}</div>
      <div className="cell count">{count}</div>
      <div className="cell date">{format(new Date(date), 'dd/MM/yyyy')}</div>
      <div className="cell location">{site}</div>      
      <div className="cell notes">{notes}</div>
    </StyledRecord>
  )}

  export default Record