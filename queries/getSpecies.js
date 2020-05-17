import gql from 'graphql-tag'
import { speciesFragment } from '../fragments'

const GET_SPECIES = gql`
  query getSpecies($where: SpeciesWhereInput) {
    specieses(where: $where) {
      ...species
    }
  } 
  ${speciesFragment}
`

export default GET_SPECIES
