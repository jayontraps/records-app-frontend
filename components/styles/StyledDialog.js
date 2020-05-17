import styled from 'styled-components'

const StyledDialog = styled.div`
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
    min-width: 30vw;
    max-width: 800px;
    overflow: auto;
    background-color: white;
    border-radius: 4px;
    padding: 30px;
    position: relative;

    .close-modal {
      &:hover {
        cursor: pointer;
      }
      svg {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

export default StyledDialog
