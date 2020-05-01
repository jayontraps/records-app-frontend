import React, { useState } from 'react'
import ClientOnlyPortal from './ClientOnlyPortal'

export default function Modal(props) {
  const { children, buttonText = 'Open Modal' } = props
  const [open, setOpen] = useState()

  return (
    <React.Fragment>
      <button type="button" onClick={event => setOpen(true)}>
        {buttonText}
      </button>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop">
            <div className="modal">
              {children}
              <button className="close-modal" type="button" onClick={event => setOpen(false)}>
                Close Modal
              </button>
            </div>
            <style jsx>{`
              :global(body) {
                overflow: hidden;
              }

              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .modal {
                width: 60vw;
                max-width: 800px;
                height: 75vh;
                max-height: 700px;                                    
                overflow: auto;            
                background-color: white; 
                border-radius: 4px;               
                padding: 30px; 
                position: relative;               
              }

              .close-modal {
                position: absolute;
                top: 20px;
                right: 20px;
              }

            `}</style>
          </div>
        </ClientOnlyPortal>
      )}
    </React.Fragment>
  )
}
