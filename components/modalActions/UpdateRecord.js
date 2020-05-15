import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { GET_RECORD } from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import CreateRecordForm from '../CreateRecordForm'
import RecordOptions from '../RecordOptions'

const UpdateRecord = props => {
const settings = useSelector(state => state.dialog)
const { id: recordId } = settings
const router = useRouter()
const { loading, error, data } = useQuery(GET_RECORD, {
  variables: {
    where: {
      id: recordId
    }
  }
})
if (loading) return 'Loading...'
if (error) return `Error! ${error.message}`
const { record } = data
const dateObj = new Date(record.date);
const momentObj = moment(dateObj)
const update = {  
  id: recordId,
  classification: {
    label: record.species.classification.name,
    value: record.species.classification.id
  },
  observer: {  
    label: record.author.name,
    value: record.author.id
  },
  species: {
    label: record.species.name,
    value: record.species.id
  },
  location: {
    label: record.location.site,
    value: record.location.id
  },
  count: record.count,
  date: momentObj,
  images: [],
  startTime: {},
  notes: '',
  latlng: {},
  breedingCode: '',
  legacyObserver: ''
}

if (record.startTime) {
  update.startTime = {
    label: record.startTime,
    value: record.startTime
  }
}

if (record.notes) {
  update.notes = record.notes
}

if (record.latlng) {
  update.latlng = {
    lat: record.latlng.lat,
    lng: record.latlng.lng
  }
}

if (record.images.length > 0) {
  update.images = record.images
}

if (record.breeding_code) {
  update.breedingCode = record.breeding_code.id
}

if (RecordOptions.legacyObserver) {
  update.legacyObserver = record.legacyObserver
}

return (
    <CreateRecordForm setOpen={() => {}} recordId={recordId} update={update} queryParams={router.query} />
  )
}

export default UpdateRecord