import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { SIGN_IN } from '../mutations'
import { GET_CURRENT_USER } from '../queries'
import Error from './ErrorMessage'
import FormStyles from './styles/Form'

const Signin = props => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signin, { loading, error, data }] = useMutation(SIGN_IN, {
    update(cache, { data: { signin: user } }) {
      console.log(user)
    },
    onCompleted: () => {
      router.push({ pathname: '/' })
    }
  })

  async function submit(e) {
    e.preventDefault()
    const res = await signin({
      variables: { email, password },
      refetchQueries: [{ query: GET_CURRENT_USER }]
    })
    setEmail('')
    setPassword('')
  }

  return (
    <FormStyles method="post" onSubmit={e => submit(e)}>
      <fieldset>
        <h3>Sign in to your account</h3>
        <input
          type="email"
          name="email"
          required
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </fieldset>
      {loading && <p>Loading...</p>}
      {error && <Error error={error} />}
    </FormStyles>
  )
}

export default Signin
