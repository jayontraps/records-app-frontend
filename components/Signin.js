import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_IN } from '../mutations'
import { GET_CURRENT_USER } from '../queries'
import Error from './ErrorMessage'
import FormStyles from './styles/Form'

const Signin = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signin, { loading, error, data }] = useMutation(SIGN_IN)

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
        <h3>Sign in</h3>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
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
