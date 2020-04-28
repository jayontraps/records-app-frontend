import React, { useState } from 'react'
import styled from 'styled-components';
import { ADD_RECORD } from '../mutations'
import { useMutation } from '@apollo/react-hooks';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Select from 'react-select'
import moment from 'moment'
import {
  ClassesOptions,
  LocationsOptions,
  SpeciesOptions,
  ObserverOptions,
  BreedingOptions
} from './fields'
import { func } from 'prop-types';

const hours = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]

const times = hours.map(time => ({ value: time, label: time }))

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

  .CalendarDay__today_3 {
    background-color: #e4e7e7;
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
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const [addRecord, { data }] = useMutation(ADD_RECORD)

  function onDatesChange({ startDate, endDate }) {
    setDate(startDate)
    setDateTo(endDate)
  }

  function onClassificationChange(e) {    
    setClassification(e.target.value)
  }

  function onStartTimeChange({value}) {
    setStartTime(value)
  }

  function onEndTimeChange({value}) {
    setEndTime(value)
  }


  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = date ? date.format() : null
    const formattedDateTo = dateTo ? dateTo.format() : null
    const vars = {
      data: {
        status: "DRAFT",
        author: {
          connect: {
            id: observer.value
          }
        },
        species: {
          connect: {
            id: species.value
          }
        },   
        location: {
          connect: {
            id: location.value
          }
        },
        breeding_code: {
          connect: {
            id: breedingCode
          }
        },
        date: formattedDate,
        dateTo: formattedDateTo,
        startTime: startTime,
        endTime: endTime,
        notes: notes,
        count: count,
      }
    }

    console.log(vars)
    addRecord({ variables: vars });
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
              isOutsideRange={() => false}
              showClearDates
              block
            />      
          </div>
          <div className="field">
            <h3>Start time:</h3>
            <Select onChange={onStartTimeChange} options={times} />
          </div>
          <div className="field">
            <h3>End time:</h3>
            <Select onChange={onEndTimeChange} options={times} />
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