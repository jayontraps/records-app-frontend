import React, { useState, useRef } from 'react'
import StyledDialog from './styles/StyledDialog'
import { useSelector, useDispatch } from 'react-redux'
import ClientOnlyPortal from './ClientOnlyPortal'
import { setDialog } from '../actions'
import { DeleteRecord, UpdateRecord } from './modalActions'
import Icon from './Icon'

const Actions = {
  delete: DeleteRecord,
  update: UpdateRecord
}

export default function Dialog(props) {
  const dispatch = useDispatch()
  const settings = useSelector(state => state.dialog)
  const { action, id } = settings
  const Action = action ? Actions[action] : null

  function close() {
    dispatch(setDialog({action: '', id: ''}))
  }

  return (
    <React.Fragment>     
      {id && (        
          <ClientOnlyPortal selector="#modal">
            <StyledDialog>
              <div className="backdrop">
                <div className="modal"> 
                  <Action />                
                  <div className="close-modal">
                    <Icon name="close" onClick={close} />
                  </div>                                    
                </div>
              </div>
              <style jsx>{`
                :global(body) {
                  overflow: hidden;
                }                 
              `}</style>
              </StyledDialog>
          </ClientOnlyPortal>
      )}
    </React.Fragment>
  )
}
