import { get } from 'lodash'
import { perPage } from '../config'

const getRecordsVariables = queryParams => {
  const page = parseFloat(queryParams.page) || 1
  const classification = get(queryParams, 'classification', null)
  const species = get(queryParams, 'species', null)
  const author = get(queryParams, 'author', null)
  const location = get(queryParams, 'location', null)
  const sort = get(queryParams, 'sort', null)

  const orderBy = sort || 'date_DESC'

  const variables = {
    orderBy: orderBy,
    skip: page * perPage - perPage,
    where: {}
  }
 
  if (species) {    
    const newWhereInput = {...variables.where}
    newWhereInput.species = {
      ...newWhereInput.species,
      name: species 
    }
    variables.where = newWhereInput
  }

  if (classification) {    
    const newWhereInput = {...variables.where}
    newWhereInput.species = {
      ...newWhereInput.species, 
      classification: { 
        name: classification 
      }
    }
    variables.where = newWhereInput
  }

  if (author) {
    const newWhereInput = {...variables.where}
    newWhereInput.author = { name: author }
    variables.where = newWhereInput
  }

  if (location) {
    const newWhereInput = {...variables.where}
    newWhereInput.location = { site: location }
    variables.where = newWhereInput
  }
  return variables
}

export default getRecordsVariables