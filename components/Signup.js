import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP } from '../mutations'
import Error from './ErrorMessage'
import FormStyles from './styles/Form'

const Signup = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [
    signup,
    { loading: mutationLoading, error: mutationError, data }
  ] = useMutation(SIGN_UP)

  async function submit(e) {
    e.preventDefault()
    const res = await signup({ variables: { email, name, password } })
    console.log(res)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <FormStyles method="post" onSubmit={e => submit(e)}>
      <fieldset>
        <h3>Sign up for an account</h3>
        <label htmlFor="email"></label>
        Email
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <label htmlFor="name"></label>
        Name
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
        <label htmlFor="password"></label>
        Password
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </fieldset>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <Error error={mutationError} />}
    </FormStyles>
  )
}

export default Signup
