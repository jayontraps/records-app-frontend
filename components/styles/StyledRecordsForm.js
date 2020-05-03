import styled from 'styled-components';

const StyledRecordsForm = styled.form`
  .field__classification { grid-area: classification; }
  .field__species { grid-area: species; }
  .field__location { grid-area: location; }
  .field__observer { grid-area: observer; }
  .field__date { grid-area: date; }
  .field__starttime { grid-area: starttime; }
  .field__endtime { grid-area: endtime; }
  .field__count { grid-area: count; }
  .field__breeding { grid-area: breeding; }
  .field__notes { grid-area: notes; }
  .field__submit { grid-area: submit; }
  
  display: grid;
  grid-gap: 20px;
  grid-template-areas: 
  "classification classification"
  "species observer"
  "date location"
  "starttime endtime"
  "count ..."
  "breeding breeding"
  "notes notes"
  "submit submit";
  grid-template-columns: 1fr 1fr;

  .select__class {
    display: flex;
    label {
      margin-right: 10px;
    }    
  }

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
    border-radius: 4;
    border: 1px solid ${props => props.theme.colors.borderColor};
    font-size: 1rem;
    font-family: ${props => props.theme.fonts.fontFamily};  
    color: ${props => props.theme.colors.primary};   
    padding: 8px;
    &.textarea {
      display: block;
      width: 100%;
    }
  }

  .DateInput_input  {
    appearance: none;
    font-size:  ${props => props.theme.fonts.sizes.body}; 
    font-family: ${props => props.theme.fonts.fontFamily};  
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
`;

export default StyledRecordsForm;
