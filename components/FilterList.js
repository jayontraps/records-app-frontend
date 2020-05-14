import React, {Fragment, useState} from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import SpeciesOptions from './fields/SpeciesOptions'
import UserOptions from './fields/UserOptions'
import LocationsOptions from './fields/LocationsOptions'
import SortOptions from './fields/SortOptions'
import ClassificationsOptions from './fields/ClassificationsOptions'

const StyledFilterList = styled.div`

  .classifications {
    grid-area: classifications;
  }
  .species {
    grid-area: species;
  }
  .observer {
    grid-area: observer;
  }
  .location {
    grid-area: location;
  }

  .sorting {
    grid-area: sorting;
  }

  .clear-filters {
    grid-area: clear-filters;
    display: flex;
    justify-content: flex-end;
  }

  .filter-list, 
  .sort-list {
    margin-bottom: 1rem;
    h3 {
      font-size: 1rem;
      margin-bottom: .5rem;
    }
  }

  .filter-list {
    .options {
      display: grid;
      grid-gap: 20px;
      grid-template-areas: "classifications species location observer";      
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  .sort-list {
    .options {
      display: grid;
      grid-gap: 20px;
      grid-template-areas: "sorting sorting ... clear-filters";      
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }



  
`


const FilterList = props => {  
  const router = useRouter()
  const [sortValue, setSortValue] = useState(null)
  const [classification, setClassification] = useState(
    props.queryParams.classification 
    ? { value: '', label: props.queryParams.classification } 
    : null)

  const [species, setSpecies] = useState(
    props.queryParams.species 
    ? { value: '', label: props.queryParams.species } 
    : null)

  const [author, setAuthor] = useState(
      props.queryParams.author 
      ? { value: '', label: props.queryParams.author } 
      : null)

  const [location, setLocation] = useState(
    props.queryParams.location 
    ? { value: '', label: props.queryParams.location } 
    : null)
  
  function handleSelectChange(newValue, actionMeta) {
    const newParams = {...router.query}
    if (actionMeta.action === 'clear') {            
      delete newParams[actionMeta.name]   
      if (actionMeta.name === 'classification') setClassification(null)
      if (actionMeta.name === 'species') setSpecies(null)
      if (actionMeta.name === 'author') setAuthor(null)
      if (actionMeta.name === 'location') setLocation(null)
      if (actionMeta.name === 'sort') setSortValue(null)
    } else {     
      // species
      if (actionMeta.name === 'species') setSpecies(newValue)
      // author
      if (actionMeta.name === 'author') setAuthor(newValue)
      // location
      if (actionMeta.name === 'location') setLocation(newValue)            
      // sorting
      if (actionMeta.name === 'sort') setSortValue(newValue)
       // classification
       if (actionMeta.name === 'classification') {
        // changing the classification should reset the species        
        delete newParams.species
        setSpecies(null)
        setClassification(newValue)
      }

      // use the label to create readable query strings except for sorting options
      const value = actionMeta.name === 'sort' ? newValue.value : newValue.label
    
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

  function clearFilters() {   
    setClassification(null)
    setSpecies(null)
    setAuthor(null)
    setLocation(null)
    setSortValue(null)
    router.push({
      pathname: router.pathname
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
            
    </Fragment>      
  )


  return (
    <StyledFilterList>      
      <div className="filter-list">
        <h3>Filter by</h3>
        <div className="options">
          <div className="classifications">
            <ClassificationsOptions 
              isClearable={true}  
              placeholder="Class"
              name="classification"
              value={classification}
              changeHandler={handleSelectChange} />
          </div>
          <div className="species">
            <SpeciesOptions 
              isClearable={true}
              placeholder="Species"
              name="species"
              value={species}
              speciesClass={classification} 
              changeHandler={handleSelectChange} />
          </div>      
          <div className="observer">
            <UserOptions
              isClearable={true}
              placeholder="Observer"
              name="author"
              value={author}
              changeHandler={handleSelectChange} />
          </div>
          <div className="location">
            <LocationsOptions
              isClearable={true}
              placeholder="Location"
              name="location"
              value={location}
              changeHandler={handleSelectChange} />
          </div>     
        </div>                      
      </div>

      <div className="sort-list">
        <h3>Sort by</h3>
        <div className="options">
          <div className="sorting">
            <SortOptions
              value={sortValue}
              isClearable={true}
              placeholder="Sort by"
              name="sort"
              changeHandler={handleSelectChange} />
          </div>
          <div className="clear-filters">
            <button onClick={() => clearFilters()}>Clear filters</button>
          </div>
          </div>
      </div>

    </StyledFilterList>
  )
}

export default FilterList