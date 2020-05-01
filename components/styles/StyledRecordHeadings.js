import styled from 'styled-components';

const StyledRecordHeadings = styled.div`   
    
    .filter-options {
      grid-area: filter-options;
    }

    .order-by-options {
      grid-area: order-by-options;
    }

    .notes {
      grid-area: notes;
    }

    display: grid; 
    grid-gap: 20px;          
    grid-template-areas:
    "filter-options filter-options filter-options order-by-options order-by-options notes";
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 400px;
    padding: 0px; 
  `

  export default StyledRecordHeadings