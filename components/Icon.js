import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.svg`
  fill: ${props => props.theme.icon.fill};
  height: ${props => props.theme.icon.height};
  width: ${props => props.theme.icon.width};
  transition: all 0.2s ease-in-out;
`

const Icon = ({ className, name, onClick = () => {} }) => (
  <StyledIcon {...{ onClick }} className={`icon ${className}`}>
    <use xlinkHref={`#icon-${name}`} />
  </StyledIcon>
)

export default Icon
