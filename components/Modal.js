import React, { useState, useRef } from 'react'
import ClientOnlyPortal from './ClientOnlyPortal'
import StyledDialog from './styles/StyledDialog'
import Icon from './Icon'

export default function Modal(props) {
  const { children, buttonText = 'Open Modal' } = props
  const [open, setOpen] = useState()
  const modalEl = useRef(null)
  
  return (
    <React.Fragment>
      <button type="button" onClick={event => setOpen(true)}>
        {buttonText}
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <StyledDialog>
            <div className="backdrop">
              <div ref={modalEl} className="modal">              
                
                {React.cloneElement(children, { 
                  parentEl: modalEl,
                  setOpen: setOpen
                })}

                <div className="close-modal">
                  <Icon className="icon" name="close" onClick={event => setOpen(false)} />
                </div>
              </div>                          
            </div>
            <style jsx>{`
                :global(body) {
                  overflow: hidden;
                }
                
                .modal {
                  height: 75vh;
                  max-height: 700px;                                               
                }
                
              `}</style>
          </StyledDialog>
        </ClientOnlyPortal>
      )}
    </React.Fragment>
  )
}
