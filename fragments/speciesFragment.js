import gql from 'graphql-tag'

const speciesFragment = gql`
  fragment species on Species {
    id
    name
    rarity
    classification {
      name
      id
    }
  }
`

export default speciesFragment