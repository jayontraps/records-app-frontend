import styled from 'styled-components';


const StyledRecord = styled.div`   
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    background-color: #f1ecec !important;
  }

  .record-data,
  .headings {
    width: calc(100% - 5rem);    
  }

  .record-options {   
    display: flex; 
    .crud-options {
      width: 2.5rem;
      height: 2.5rem;      
      position: relative;

      .popup-trigger {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .view-more {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;      
      &:hover {
        cursor: pointer;        
      }
    }
  }
  
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
  .times {
    grid-area: times;
  }
  .notes { 
    grid-area: notes; 
  }
  .breeding__code { 
    grid-area: breeding__code; 
  }

  .gridref {
    grid-area: gridref;
  }

  .images {
    grid-area: images;
  }

  .popup-trigger {    
    &:hover {
      cursor: pointer;
    }
  }

  .row {
    display: grid;
    grid-gap: 20px;
    padding: ${props => props.theme.list.spacing.vertical};
    &.first {
      grid-template-areas:
      "date species location count observer";
      grid-template-columns: 1fr 1fr 1fr 50px 1fr;  
    }
    &.second {
      grid-template-areas:
      "times breeding_code gridref gridref gridref";
      grid-template-columns: 1fr 1fr 1fr 50px 1fr; 
    }  
    &.third {
      grid-template-areas:
      "notes notes notes notes 1fr";
      grid-template-columns: 1fr 1fr 1fr 50px 1fr;
    }      
    &.fourth {
      grid-template-areas:
      "images images images images 1fr";
      grid-template-columns: 1fr 1fr 1fr 50px 1fr;
    }
  }

 


  /* display: grid;
  grid-gap: 20px;
  grid-template-areas:
  "species location count date times notes observer more";
  grid-template-columns: 1fr 1fr 50px 1fr 1fr 400px 1fr 2rem;  
  padding: ${props => props.theme.list.spacing.vertical};
  &.filter-list {
    padding: .25rem 0 ${props => props.theme.list.spacing.vertical} 0;
    .notes {
      display: flex;
      align-items: flex-end;
    }
  } */

  
  

  .legacy-observer {
    color: ${props => props.theme.colors.legacy};
  }

  &.loading {
    font-size: ${props => props.theme.fonts.sizes.body};
    height: calc(${props => props.theme.fonts.bodyLineHeight} + 24.5px);    
  }
  
  .image-link {
    display: inline-block;
    margin-right: 1rem;
  }

  .expandpanel__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease-out;
  }

  &.open {
    .expandpanel__content {
      max-height: 200px;
      transition: max-height 0.45s ease-in;
    }
  }
`

export default StyledRecord