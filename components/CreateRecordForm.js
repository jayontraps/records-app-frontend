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

class CreateRecordForm extends Component {
  state = {
    class: 'bird',
    observer: {},
    species: '',
    location: '',
    date: null,
    dateTo: null,
    count: 0,
    notes: '',
    breeding_code: '' ,
    focusedInput: null
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ 
      date: startDate, 
      dateTo: endDate 
    })
  }

  onCountChange = (e) => {
    this.setState({
      count: e.target.value
    })
  }

  onNotesChange = (e) => {
    this.setState({
      notes: e.target.value
    })
  }

  locationChangeHandler = location => {
    // console.log('this is the locationChangeHandler')
    this.setState({
      location: location.value
    })
  }

  observerChangeHandler = user => {
    // console.log('this is the observerChangeHandler')
    this.setState({
      observer: user
    })
  }

  speciesChangeHandler = species => {
    // console.log(value)
    this.setState({
      species: species.value
    })
  }

  classChangeHandler = (e) => {
    this.setState({
      class: e.target.value
    })
  }

  breedingChangeHandler = (e) => {
    this.setState({
      breeding_code: e.target.value
    })
  }

  handleSubmit = (event) => {
    console.log('the for was submitted: ', this.state);
    event.preventDefault();
  }
  
  render() {
    return (
        <StyledFrom>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <h3>Select class:</h3>         
              <ClassesOptions currentClassification={this.state.class} changeHandler={this.classChangeHandler} />
            </div>            
            <div className="field">
              <h3>Species:</h3>
              <SpeciesOptions speciesClass={this.state.class} changeHandler={this.speciesChangeHandler} />
            </div>
            <div className="field">
              <h3>Location:</h3>
              <LocationsOptions fieldName="location" changeHandler={this.locationChangeHandler} />
            </div>
            <div className="field">
              <h3>Observer:</h3>
              <ObserverOptions fieldName="observer" changeHandler={this.observerChangeHandler} />
            </div>
            <div className="field">
              <h3>Dates:</h3>
              <DateRangePicker
                startDate={this.state.date} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.dateTo} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                showClearDates
                block
              />      
            </div>
            <div className="field">
              <h3><label htmlFor="count">Count:</label></h3>             
              <input type="number" className="input" name="count" value={this.state.count} onChange={this.onCountChange} />
            </div>
            <div className="field">
              <h3>Notes:</h3>
              <input type="textarea" rows={10} className="input textarea" name="notes" value={this.state.notes} onChange={this.onNotesChange} />
            </div>
            <div className="field">
              <h3>Breeding Code:</h3>         
              <BreedingOptions currentBreedingCode={this.state.breeding_code} changeHandler={this.breedingChangeHandler} />
            </div>
            <div className="field">
              <input className="button__submit" type="submit" value="Submit" />
            </div>
          </form>
        </StyledFrom>
    )
  }
}

export default CreateRecordForm