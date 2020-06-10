import { useContext } from 'react'
import UserContext from '../UserContext'

const Permission = props => {
  const userInfo = useContext(UserContext)
  const { me } = userInfo
  if (!me) return null
  const { permissions } = me
  const { permissions: requiredPermissions } = props

  const hasPermission = permissions.some(permission =>
    requiredPermissions.includes(permission)
  )

  return hasPermission ? props.children : null
}

export default Permission
