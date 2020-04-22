import React, { Component, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
import styled from 'styled-components';
import { GET_SPECIES } from '../queries'

const CLASSES_QUERY = gql`
  query {
    classes {
      name
      id
    }
  }
`
const LOCATIONS_QUERY = gql`
  query {
    locations {
      id
      site
    }
  }
`

const USERS_QUERY = gql`
  query {
    users {
      name
      id
    }
  }
`

// const DatePickerUI = (props) => {
//   const [selectedDate, handleDateChange] = useState(new Date());
//   useEffect(() => {
//     props.onDateChange(selectedDate)
//     return () => {      
//     }
//   }, [selectedDate])
//   return (
//     <MuiPickersUtilsProvider utils={MomentUtils}>
//       <DatePicker value={selectedDate} onChange={handleDateChange} />
//     </MuiPickersUtilsProvider>
//   );
// }

const ClassesOptions = props => {
  const { changeHandler, currentClassification } = props
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
            value={cl.name}
            checked={cl.name === currentClassification}                        
            />
          {cl.name}
        </label>           
      ))}
    </div>
  );
}

const LocationsOptions = props => {
  const { changeHandler, fieldName } = props
  const { loading, error, data } = useQuery(LOCATIONS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const locations = data.locations.map(loc => ({
    value: loc.id,
    label: loc.site
  }))
  return <CreatableSingle {...{fieldName}} {...{changeHandler}} options={locations} />
}


const ObserverOptions = props => {
  const { changeHandler, fieldName } = props
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const observers = data.users.map(observer => ({
    value: observer.id,
    label: observer.name
  }))
  return <CreatableSingle {...{fieldName}} {...{changeHandler}} options={observers} />
}

const SpeciesOptions = props => {
  const { changeHandler, speciesClass } = props
  const { loading, error, data } = useQuery(
    GET_SPECIES,
    {
      variables: { 
        where: {
          class: { 
            name: speciesClass
          }
        }},
    });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const species = data.specieses.map(species => ({
    value: species.id,
    label: species.name
  }))
  return <Select {...{changeHandler}} options={species} />
}





const StyledFrom = styled.form`
  .select__class {
    display: flex;
    label {
      margin-right: 10px;
    }
  }
`
class CreatableSingle extends Component {
  handleChange = (newValue, actionMeta) => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    this.props.changeHandler(newValue)
  };
  handleInputChange = (inputValue, actionMeta) => {
    // console.group('Input Changed');
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={this.props.options}
        placeholder={`Select or create new${this.props.fieldName ? ` ${this.props.fieldName}`: ''}...`}
      />
    );
  }
}

class CreateRecordForm extends Component {
  state = {
    class: 'bird',
    observer: {},
    species: {},
    location: {},
    date: '',
    dateTo: '',
    count: 0,
    notes: '',
    breeding_code: ''  
  }

  onDateChange = date => this.setState({ date })
  onDateToChange = date => this.setState({ dateTo: date })

  locationChangeHandler = value => {
    this.setState({
      location: value
    })
  }

  observerChangeHandler = value => {
    this.setState({
      observer: value
    })
  }

  speciesChangeHandler = value => {
    this.setState({
      species: value
    })
  }

  classChangeHandler = (e) => {
    this.setState({
      class: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <StyledFrom>
          <h3>Select class:</h3>         
          <ClassesOptions currentClassification={this.state.class} changeHandler={this.classChangeHandler} />
          <h3>Species:</h3>
          <SpeciesOptions speciesClass={this.state.class} changeHandler={this.speciesChangeHandler} />
          <h3>Location:</h3>
          <LocationsOptions fieldName="location" changeHandler={this.locationChangeHandler} />
          <h3>Observer:</h3>
          <ObserverOptions fieldName="observer" changeHandler={this.observerChangeHandler} />
          <h3>Date From:</h3>
          {/* <DatePickerUI onDateChange={this.onDateChange} /> */}
          {/* <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}

          {/* <div>
            <DatePicker
              onChange={this.onDateChange}
              selected={this.state.date}
            />
          </div>
          <h3>Date To:</h3>
          <div>
            <DatePicker
              onChange={this.onDateToChange}
              selected={this.state.dateTo}
            />
          </div> */}
        </StyledFrom>
      </div>
    )
  }
}

export default CreateRecordForm