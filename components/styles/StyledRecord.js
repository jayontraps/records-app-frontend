import styled from 'styled-components';

const StyledRecord = styled.div` 
  
  .species { 
    grid-area: species; 
  }
  .observer { 
    grid-area: observer; 
  }
  .count { 
    grid-area: count; 
  }
  .date { 
    grid-area: date; 
  }
  .location { 
    grid-area: location; 
  }
  .notes { 
    grid-area: notes; 
  }
  .breeding__code { 
    grid-area: breeding__code; 
  }

  display: grid;
  grid-gap: 20px;
  grid-template-areas:
  "species observer location count date  notes";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 400px;  
  padding: ${props => props.theme.list.spacing.vertical};
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};

  .legacy-observer {
    color: ${props => props.theme.colors.legacy};
  }
`

export default StyledRecord