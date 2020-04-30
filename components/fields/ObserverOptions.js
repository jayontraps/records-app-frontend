import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import CreatableSelect from 'react-select/creatable';

const USERS_QUERY = gql`
  query {
    users {
      name
      id
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

const ObserverOptions = props => {
  const { changeHandler, fieldName, name = 'author' } = props
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const observers = data.users.map(observer => ({
    value: observer.id,
    label: observer.name
  }))
  return <CreatableSingle 
            {...{name}} 
            {...{fieldName}} 
            {...{changeHandler}} 
            options={observers} />
}     

export default ObserverOptions