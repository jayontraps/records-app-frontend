import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { setMe } from '../actions'
import { SIGN_UP } from '../mutations'
import { GET_CURRENT_USER } from '../queries'
import Error from './ErrorMessage'
import FormStyles from './styles/Form'

const Signup = props => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signup, { loading, error, data }] = useMutation(SIGN_UP, {
    update(cache, { data: { signup: user } }) {
      console.log(user)
    },
    onCompleted: () => {
      router.push({ pathname: '/' })
    }
  })

  async function submit(e) {
    e.preventDefault()
    const res = await signup({
      variables: { email, name, password },
      refetchQueries: [{ query: GET_CURRENT_USER }]
    })
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <FormStyles method="post" onSubmit={e => submit(e)}>
      <fieldset>
        <h3>Sign up for an account</h3>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </fieldset>
      {loading && <p>Loading...</p>}
      {error && <Error error={error} />}
    </FormStyles>
  )
}

export default Signup
