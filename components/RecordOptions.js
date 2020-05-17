import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { setDialog } from '../actions'
import Popup from './Popup'

const StyledList = styled.ul`
  padding: 0 0.5rem;
  li {
    line-height: 2.5;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const RecordOptions = ({ recordId }) => {
  const dispatch = useDispatch()

  function handleClick(action) {
    dispatch(setDialog(action))
  }

  return (
    <Popup align="right" className="record-options">
      <StyledList className="options">
        <li onClick={() => handleClick({ action: 'update', id: recordId })}>
          Edit
        </li>
        <li onClick={() => handleClick({ action: 'delete', id: recordId })}>
          Delete
        </li>
      </StyledList>
    </Popup>
  )
}

export default RecordOptions
