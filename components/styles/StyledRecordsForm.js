import styled from 'styled-components'

const StyledRecordsForm = styled.form`
  .field__classification {
    grid-area: classification;
  }
  .field__species {
    grid-area: species;
  }
  .field__location {
    grid-area: location;
  }
  .field__observer {
    grid-area: observer;
  }
  .field__date {
    grid-area: date;
  }
  .field__starttime {
    grid-area: starttime;
  }
  .field__endtime {
    grid-area: endtime;
  }
  .field__count {
    grid-area: count;
  }
  .field__breeding {
    grid-area: breeding;
  }
  .field__notes {
    grid-area: notes;
  }
  .field__submit {
    grid-area: submit;
  }
  .field__altlocation {
    grid-area: altlocation;
  }
  .field__images {
    grid-area: images;
  }

  min-height: 75vh;
  min-width: 740px;
  margin: 2rem 0;
  display: grid;
  grid-gap: 2rem;
  grid-template-areas:
    'classification species'
    'date starttime'
    'location ...'
    'altlocation altlocation'
    'count images'
    'notes notes'
    'observer ...'
    'breeding breeding'
    'submit submit';
  grid-template-columns: 1fr 1fr;

  .field-status {
    display: flex;
    justify-content: space-between;
  }

  .required {
    color: red;
  }

  .field {
    h3 {
      margin-bottom: 5px;
    }
  }

  .input {
    appearance: none;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: ${props => props.theme.borderRadius};
    font-size: 0.8rem;
    font-family: ${props => props.theme.fonts.fontFamily};
    color: ${props => props.theme.colors.primary};
    padding: 8px;
    &.textarea {
      display: block;
      width: 100%;
    }
    &:focus {
      border-color: ${props => props.theme.colors.focused};
    }
  }

  .DateInput_input {
    appearance: none;
    font-size: ${props => props.theme.fonts.sizes.body};
    font-family: ${props => props.theme.fonts.fontFamily};
    color: ${props => props.theme.colors.primary};
    padding: 0.5rem 1rem;
    min-height: 38px;
  }

  .CalendarDay__today_3 {
    background-color: #e4e7e7;
  }

  .SingleDatePickerInput__withBorder {
    border-radius: ${props => props.theme.borderRadius};
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

  .altlocation {
    height: 600px;
    width: 100%;
    position: relative;
  }
`

export default StyledRecordsForm
