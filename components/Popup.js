import React from 'react'
import styled from 'styled-components'

const StyledPopup = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 0 0 1px rgba(89, 105, 129, 0.1),
    0 3px 20px 0 rgba(89, 105, 129, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 100;
  padding: 1rem;
`

const Popup = ({ children, className, align = 'left' }) => {
  let style = {}
  style[align] = '0'
  return (
    <StyledPopup {...{ style }} className={`popup ${className}`}>
      {children}
    </StyledPopup>
  )
}

export default Popup
