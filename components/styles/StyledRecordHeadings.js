import styled from 'styled-components'

const StyledRecordHeadings = styled.div`   
   
    .filter-options {  grid-area: filter-options }
    .order-by-options { grid-area: order-by-options }
    .clear-filters { 
      grid-area: clear-filters;
      display: flex;
      justify-content: flex-end;
      button {                
        /* border-radius: ${props => props.theme.borderRadius};
        background-color: white;
        border: 1px solid ${props => props.theme.colors.active};
        color: ${props => props.theme.colors.active};
        &:hover {
          color: ${props => props.theme.colors.activeHover};
          border-color: ${props => props.theme.colors.activeHover};
        } */
      }     
    }

    display: grid; 
    grid-gap: 20px;          
    grid-template-areas:
    "filter-options filter-options filter-options order-by-options order-by-options clear-filters clear-filters";
    grid-template-columns: 1fr 1fr 1fr 100px 1fr 400px 2rem;
    padding: 0px; 
  `

export default StyledRecordHeadings
