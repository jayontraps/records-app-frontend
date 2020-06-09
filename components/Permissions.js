import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS_ADMIN } from '../queries'
import { UPDATE_PERMISSIONS } from '../mutations'
import ErrorMessage from './ErrorMessage'
import { possiblePermissions } from '../constants'
import Table from './styles/Table'

const UserPermissions = props => {
  const { user } = props
  const [permissions, setPermissions] = useState(props.user.permissions)
  const [
    updatePermissions,
    { loading: mutationLoading, error: mutationError, data }
  ] = useMutation(UPDATE_PERMISSIONS)
  function handlePermissionChange(e) {
    const checkbox = e.target
    let updatedPermissions = [...permissions]
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      )
    }
    setPermissions(updatedPermissions)
  }

  function update() {
    updatePermissions({
      variables: {
        permissions: permissions,
        userId: user.id
      }
    })
  }

  if (mutationError)
    return (
      <tr>
        <td colSpan={8}>
          <ErrorMessage error={mutationError} />
        </td>
      </tr>
    )

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              id={`${user.id}-permission-${permission}`}
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <button disabled={mutationLoading} onClick={update}>
          update
        </button>
      </td>
    </tr>
  )
}

const Permissions = props => {
  const { loading, data, error } = useQuery(GET_USERS_ADMIN)
  if (error) return <ErrorMessage error={error} />

  return data ? (
    <div>
      <h2>Manage Permissions</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {possiblePermissions.map(permission => (
              <th key={permission}>{permission}</th>
            ))}
            <th>👇🏻</th>
          </tr>
        </thead>
        <tbody>
          {data.usersAdmin &&
            data.usersAdmin.map(user => (
              <UserPermissions user={user} key={user.id} />
            ))}
        </tbody>
      </Table>
    </div>
  ) : null
}

export default Permissions
