import React, {useState} from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const StyledExpandPanel = styled.div`
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius};

  .expandpanel__header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    &:hover {
      cursor: pointer;
    }

    h3 {
      margin: 0;
      line-height: 1em;
    }

  }
  .expandpanel__icon {

  }

  .expandpanel__content {
    margin: 0 1rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease-out;   
  }

  &.open {
    .expandpanel__content {
      max-height: 3000px;
      transition: max-height 0.45s ease-in;
    }
  }
`

const ExpandPanel = props => {
  const { children, heading } = props
  const [open, setOpen] = useState(false)
  
  function expand(e) {    
    e.preventDefault()
    setOpen(!open)
  }

  const collapsedStatus = open ? 'open' : 'closed'

  return (
    <StyledExpandPanel className={`expandpanel ${collapsedStatus}`}>
      <div onClick={e => {expand(e)}} className="expandpanel__header">
        <h3>{heading}</h3>
        <Icon className="expandpanel__icon" name="down-arow" />
      </div>
      <div className={`expandpanel__content`}>
        {children}
      </div>     
    </StyledExpandPanel>
  )
}

export default ExpandPanel