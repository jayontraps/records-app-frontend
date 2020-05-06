import React from 'react'
import styled from 'styled-components'

const StyledPopup = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  position: absolute;
  z-index: 100;
  padding: 1rem;
  top: 20px;
`

const Popup = ({
  children,
  className,
  align = "left"
}) => {
  let style = {}
  style[align] = '0'
  return (
    <StyledPopup {...{style}} className={`popup ${className}`}>
      {children}
    </StyledPopup>
  )
}

export default Popup