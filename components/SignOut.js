import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_OUT } from '../mutations'
import { GET_CURRENT_USER } from '../queries'

const SignOut = props => {
  const [signout] = useMutation(SIGN_OUT)
  return (
    <span
      className="signout"
      onClick={() => {
        signout({
          refetchQueries: [{ query: GET_CURRENT_USER }]
        })
      }}
    >
      Sign out
    </span>
  )
}

export default SignOut
