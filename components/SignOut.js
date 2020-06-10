import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_OUT } from '../mutations'
import { GET_CURRENT_USER } from '../queries'

const SignOut = props => {
  const router = useRouter()
  const [signout] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      console.log('sign out complete!')
      router.push({ pathname: '/' })
    }
  })
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
