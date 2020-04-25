import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import {
  ClassesOptions,
  LocationsOptions,
  SpeciesOptions,
  ObserverOptions,
  BreedingOptions
} from './fields'
import { func } from 'prop-types';

const StyledFrom = styled.div`
  .select__class {
    display: flex;
    label {
      margin-right: 10px;
    }    
  }

  .field {
    margin-bottom: 20px;
    h3 {
      margin-bottom: 5px;
    }
  }

  .input {
    border-radius: 4;
    border: 1px solid ${props => props.theme.colors.borderColor};
    font-size: 1rem;
    font-family: ${props => props.theme.fontFamily};  
    color: ${props => props.theme.colors.primary};   
    padding: 8px;
    &.textarea {
      display: block;
      width: 100%;
    }
  }

  .DateInput_input  {
    appearance: none;
    font-size: 1rem;
    font-family: ${props => props.theme.fontFamily};  
    color: ${props => props.theme.colors.primary};   
    padding: 8px;
  }

  .button__submit {
    appearance: none;
    border: 1px solid ${props => props.theme.colors.borderColor}; 
    padding: 10px;
    font-size: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
`

const CreateRecordForm = () => {  
  const [classification, setClassification] = useState('ck9f9aaynibtf0923697lm5qf');
  const [observer, setObserver] = useState({})
  const [species, setSpecies] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [count, setCount] = useState('0')
  const [notes, setNotes] = useState('')
  const [breedingCode, setBreedingCode] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  function onDatesChange({ startDate, endDate }) {
    setDate(startDate)
    setDateTo(endDate)
  }

  function onClassificationChange(e) {    
    setClassification(e.target.value)
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log('classification: ', classification)
    console.log('observer: ', observer)
    console.log('species: ', species)
    console.log('location: ', location)
    console.log('date: ', date)
    console.log('dateTo: ', dateTo)
    console.log('count: ', count)
    console.log('notes: ', notes)
    console.log('breedingCode: ', breedingCode)        
  }
  
  
  return (
      <StyledFrom>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="field">
            <h3>Select class:</h3>         
            <ClassesOptions currentClassificationId={classification} changeHandler={e => onClassificationChange(e)} />
          </div>            
          <div className="field">
            <h3>Species:</h3>
            <SpeciesOptions speciesClass={classification} changeHandler={setSpecies} />
          </div>
          <div className="field">
            <h3>Location:</h3>
            <LocationsOptions fieldName="location" changeHandler={setLocation} />
          </div>
          <div className="field">
            <h3>Observer:</h3>
            <ObserverOptions fieldName="observer" changeHandler={setObserver} />
          </div>
          <div className="field">
            <h3>Dates:</h3>
            <DateRangePicker
              startDate={date} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={dateTo} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={onDatesChange} // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
              showClearDates
              block
            />      
          </div>
          <div className="field">
            <h3><label htmlFor="count">Count:</label></h3>             
            <input type="number" className="input" name="count" value={count} onChange={e => setCount(e.target.value)} />
          </div>
          <div className="field">
            <h3>Notes:</h3>
            <input type="textarea" rows={10} className="input textarea" name="notes" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div className="field">
            <h3>Breeding Code:</h3>         
            <BreedingOptions currentBreedingCode={breedingCode} changeHandler={e => setBreedingCode(e.target.value)} />
          </div>
          <div className="field">
            <input className="button__submit" type="submit" value="Submit" />
          </div>
        </form>
      </StyledFrom>
    )
  }


export default CreateRecordForm