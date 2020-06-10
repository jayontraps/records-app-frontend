const Permission = props => {
  const {
    user: { permissions },
    permissions: requiredPermissions
  } = props

  const hasPermission = permissions.some(permission =>
    requiredPermissions.includes(permission)
  )

  return hasPermission ? props.children : null
}

export default Permission
