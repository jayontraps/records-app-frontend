import React, {useState} from 'react'
import { format } from 'date-fns';
import StyledRecord from './styles/StyledRecord'
import Icon from './Icon'

const Record = ({record}) => {
    const { 
      id,
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
    //  const breedingCode = get(breeding_code, 'code', '')
    //  const breedingDescription = get(breeding_code, 'description', '')
     const [showMore, setShowMore] = useState(false)
    return (
    <StyledRecord className="record">
      <div className="cell species">{name}</div>      
      <div className={`cell observer ${authorrName === 'Legacy' ? 'legacy-observer' : ''}`}>
      {authorrName === 'Legacy' ? `${legacyObserver}` : authorrName}</div>
      <div className="cell count">{count}</div>
      <div className="cell date">{format(new Date(date), 'dd/MM/yyyy')}</div>
      <div className="cell location">{site}</div>      
      <div className="cell notes">{notes}</div>
      <div className="cell more">
        <Icon onClick={() =>setShowMore(true)} className="more__icon" name="more_vert" />
      </div> 
    </StyledRecord>
  )}

  export default Record