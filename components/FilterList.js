import styled from 'styled-components'
import React, {Fragment, useState} from 'react'
import { useRouter } from 'next/router'
import StyledRecord from './styles/StyledRecord'
import StyledRecordHeadings from './styles/StyledRecordHeadings'
import SpeciesOptions from './fields/SpeciesOptions'
import UserOptions from './fields/UserOptions'
import LocationsOptions from './fields/LocationsOptions'
import DateOptions from './fields/DateOptions'
import CountOptions from './fields/CountOptions'
import { birdClassId } from '../config'



const FilterList = props => {
  const router = useRouter()
  const [countValue, setCountValue] = useState(null)
  const [dateValue, setDateValue] = useState(null)
  
  function handleSelectChange(newValue, actionMeta) {
    const newParams = {...router.query}
    
    if (actionMeta.action === 'clear') {            
      delete newParams[actionMeta.name]
      if (actionMeta.name === 'date') {
        setDateValue(null)
      }
      if (actionMeta.name === 'count') {
        setCountValue(null)
      }
    } else {

       // use the label to create readable query strings except for sorting options
       const value = actionMeta.name === 'date' || actionMeta.name === 'count' 
       ? newValue.value 
       : newValue.label

      // date and count are mutually exclusive - setting one flips the other
      if (actionMeta.name === 'date' ) {
        delete newParams.count
        setCountValue(null)  
        setDateValue(newValue)    
      }
      if (actionMeta.name === 'count' ) {
        delete newParams.date
        setDateValue(null)
        setCountValue(newValue)  
      }
    
      newParams[actionMeta.name] = value       
    }
    // reset to page 1
    delete newParams.page
    // update url
    router.push({
      pathname: router.pathname,
      query: newParams
    })  
  }
  
  const HeadingRow = () => (
    <Fragment>
      <div className="filter-options">
        <h4>Filter-by:</h4>
        </div>
      <div className="order-by-options">
        <h4>Order-by:</h4>
      </div>      
      <div className="notes"></div>
    </Fragment>      
  )


  return (
    <Fragment>
      <StyledRecordHeadings>
          <HeadingRow />
      </StyledRecordHeadings>
      
      <StyledRecord className="filter-list">
        <div className="species">
          <SpeciesOptions 
            isClearable={true}
            placeholder="Speices"
            name="species"
            speciesClass={birdClassId} 
            changeHandler={handleSelectChange} />
        </div>      
        <div className="observer">
          <UserOptions
            isClearable={true}
            placeholder="Observer"
            name="author"
            changeHandler={handleSelectChange} />
        </div>
        <div className="location">
          <LocationsOptions
            isClearable={true}
            placeholder="Location"
            name="location"
            changeHandler={handleSelectChange} />
        </div>   
        <div className="count">
          <CountOptions
            value={countValue}
            isClearable={true}
            placeholder="Count"
            name="count"
            changeHandler={handleSelectChange} />
        </div>
        <div className="date">
          <DateOptions
            value={dateValue}
            isClearable={true}
            placeholder="Date"
            name="date"
            changeHandler={handleSelectChange} />
        </div>        
        <div className="notes">Notes</div>
      </StyledRecord>
    </Fragment>
  )
}

export default FilterList