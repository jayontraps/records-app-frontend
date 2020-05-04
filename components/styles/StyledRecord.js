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

  .more {
    grid-area: more
  }

  display: grid;
  grid-gap: 20px;
  grid-template-areas:
  "species observer location count date notes more";
  grid-template-columns: 1fr 1fr 1fr 100px 1fr 400px 1rem;  
  padding: ${props => props.theme.list.spacing.vertical};
  &.filter-list {
    padding: .25rem 0 ${props => props.theme.list.spacing.vertical} 0;
    .notes {
      display: flex;
      align-items: flex-end;
    }
  }
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};

  .legacy-observer {
    color: ${props => props.theme.colors.legacy};
  }

  &.loading {
    font-size: ${props => props.theme.fonts.sizes.body};
    height: calc(${props => props.theme.fonts.bodyLineHeight} + 24.5px);    
  }
`

export default StyledRecord