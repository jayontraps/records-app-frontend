import { useQuery } from '@apollo/react-hooks'
import { GET_CURRENT_USER } from '../queries'
import Signin from './Signin'

const PleaseSignIn = props => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  if (loading) return <p>Loading ...</p>
  if (!data.me) {
    return (
      <div>
        <h3>Please Sign In before Continuing</h3>
        <Signin />
      </div>
    )
  }
  return props.children
}

export default PleaseSignIn
