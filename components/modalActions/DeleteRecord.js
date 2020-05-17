import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setDialog } from '../../actions'
import { GET_RECORDS, getRecordsVariables } from '../../queries'
import { DELETE_RECORD } from '../../mutations'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    display: block;
    width: 45%;
  }
`

const DeleteRecord = props => {
  const router = useRouter()
  const variables = getRecordsVariables(router.query)
  const dispatch = useDispatch()
  const settings = useSelector(state => state.dialog)
  const { action, id } = settings

  function close() {
    dispatch(setDialog({ id: '', action: '' }))
  }

  const [
    deleteRecord,
    { loading: mutationLoading, error: mutationError, data: mutationDat }
  ] = useMutation(DELETE_RECORD, {
    update(cache, { data: { deleteRecord } }) {
      const { records } = cache.readQuery({
        query: GET_RECORDS,
        variables: variables
      })

      cache.writeQuery({
        query: GET_RECORDS,
        variables: variables,
        data: { records: records.filter(r => r.id !== deleteRecord.id) }
      })
    },
    onCompleted: () => {
      console.log('delete complete!')
    }
  })

  return (
    <div>
      <h3>Delete record</h3>
      <StyledDiv className="actions">
        <button onClick={e => close()}>Cancel</button>
        <button
          onClick={e => {
            e.preventDefault()
            deleteRecord({ variables: { where: { id: id } } })
            close()
          }}
        >
          Confrm
        </button>
      </StyledDiv>
    </div>
  )
}

export default DeleteRecord
