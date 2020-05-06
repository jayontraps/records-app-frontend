import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setDialog } from '../actions'
import Popup from './Popup'

const StyledPopup = styled.ul`
  li {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const RecordOptions = ({recordId}) => {
  const dispatch = useDispatch()
  
  function handleClick(action) {
    dispatch(setDialog(action))
  }

  return (
    <Popup align="right" className="record-options">
      <StyledPopup className="options">
        <li>Publish</li>        
        <li onClick={() => handleClick({action: 'update', id: recordId})}>Update</li>
        <li onClick={() => handleClick({action: 'delete', id: recordId})}>Delete</li>       
      </StyledPopup>
    </Popup>
  )
}


export default RecordOptions
