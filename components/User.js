import { GET_CURRENT_USER } from '../queries'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

const User = props => (
  <Query {...props} query={GET_CURRENT_USER}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired
}

export default User
