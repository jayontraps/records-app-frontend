import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ADD_RECORD } from '../mutations'
import { GET_USERS, GET_RECORDS, getRecordsVariables } from '../queries'
import { useMutation } from '@apollo/react-hooks';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Select from 'react-select'
import {
  ClassesOptions,
  LocationsOptions,
  SpeciesOptions,
  ObserverOptions,
  BreedingOptions,
  MapContainer,
  ImageUploading
} from './fields'
import ExpandPanel from '../components/ExpandPanel'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import StyledRecordsForm from './styles/StyledRecordsForm'
import { birdClassId, cloudinaryCloudName } from '../config'

const hours = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]

const times = hours.map(time => ({ value: time, label: time }))

const CreateRecordForm = props => {  
  const [classification, setClassification] = useState(birdClassId);
  const [observer, setObserver] = useState({})
  const [species, setSpecies] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [count, setCount] = useState('0')
  const [notes, setNotes] = useState('')
  const [breedingCode, setBreedingCode] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [showRequiredMsg, setShowRequiredMsg] = useState(false)
  const [images, setImages] = useState([])
  const [latlng, setLatlng] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  const { queryParams, parentEl } = props
  const variables = getRecordsVariables(queryParams)

  const [
    addRecord,
    { loading: mutationLoading, error: mutationError, data: mutationDat }
  ] = useMutation(
    ADD_RECORD,
    {
      update(cache, { data: { createRecord } }) {
        const { records } = cache.readQuery({ 
          query: GET_RECORDS,
          variables: variables
        });

        cache.writeQuery({
          query: GET_RECORDS,
          variables: variables,
          data: { records: [createRecord, ...records] }
        });

        const { users } = cache.readQuery({ 
          query: GET_USERS,
          // variables: variables
        });

        cache.writeQuery({
          query: GET_USERS,
          // variables: variables,
          data: { users: [createRecord.author, ...users] }
        });
      },
      onCompleted: () => {
        console.log('complete!');
        props.setOpen(false);
      }
    })

  function onDatesChange({ startDate, endDate }) {
    setDate(startDate)
    setDateTo(endDate)
  }

  function onClassificationChange(e) {    
    setClassification(e.target.value)
  }

  function onStartTimeChange(newValue, metaAction) {
    if (metaAction.action === 'select-option') {
      setStartTime(newValue.value)
    }      
  }

  function onEndTimeChange(newValue, metaAction) {
    if (metaAction.action === 'select-option') {
      setEndTime(newValue.value)
    } 
  }

  function requiredFieldsComplete() {
    if (!species) return false
    if (!date) return false
    if (!location) return false
    if (!observer || !observer.label) return false

    return true    
  }
  

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


  async function uploadFile(file) {
    const data = new FormData()
    data.append('file', file)    
    data.append('upload_preset', 'records')
    const res = await fetch('https://api.cloudinary.com/v1_1/dtceo0fjk/image/upload', {
      method: 'POST',
      body: data
    })

    const result = await res.json();    
    return result  
  }
    

  async function handleFiles(e) {    
    e.preventDefault()
    setUploading(true)
    const files = Array.from(e.target.files)
    await asyncForEach(files, async (file) => {    
      const newImage = await uploadFile(file);   
      if (newImage) {
        setImages(images => [...images, newImage])
      }      
    });    
    setUploading(false)
    console.log('Uploading done');
  }

  async function deleteImage(index) {     
    const data = new FormData()    
    data.append('token', images[index].delete_token)   
    data.append('upload_preset', 'records')
    const res = await fetch('https://api.cloudinary.com/v1_1/dtceo0fjk/image/delete_by_token', {
      method: 'POST',
      body: data
    })
    const result = await res.json(); 

    return result
  }


  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = date ? date.format() : null
    const formattedDateTo = dateTo ? dateTo.format() : null
            
    // validate required fields
    if (requiredFieldsComplete()) {
      // if no author id provided, create a new one
      let author
      if (observer.__isNew__) {
        author = {
          create: {
            name: observer.value
          }
        }        
      } else {
        author = {
          connect: {
            id: observer.value
          }
        }
      }
                 
      const vars = {
        data: {
          status: "DRAFT",
          author,
          species: {
            connect: {
              id: species.value
            }
          },   
          location: {
            connect: {
              id: location.value
            }
          },
          date: formattedDate,
          dateTo: formattedDateTo,
          startTime: startTime,
          endTime: endTime,
          notes: notes,
          count: count
        }
      }
      if (latlng) {
        vars.data.latlng = {
          create: {
            ...latlng 
          }
        }
      }

      if (images.length) {
        const imgArr = images.map(img => img.secure_url)        
        const createArr = []
        imgArr.forEach(imgSrc => { 
          createArr.push({
            src: imgSrc,
            author
          })
        })
        vars.data.images = {
          create: createArr
        }
      }

      // add breeding code if available
      if (breedingCode) {
        vars.data.breeding_code = {
          connect: {
            id: breedingCode
          }
        }
      }

      // console.log('vars: ', vars)
      addRecord({ variables: vars })
    } else {
      setShowRequiredMsg(true)
      parentEl.current.scrollTop = 0;
    }       
  }
  
  
  return (
      <StyledRecordsForm 
        className="create-record-form" 
        onSubmit={e => handleSubmit(e)}>
        <div className="field field__classification">
          <h3>Classification:</h3>         
          <ClassesOptions 
              currentClassificationId={classification} 
              changeHandler={e => onClassificationChange(e)} />
        </div>            
        
        <div className="field field__species">

          <div className="field-status">
            <h3>Species:</h3>
            {showRequiredMsg && !species && <span className="required">Required field</span>}
          </div>
         
          <SpeciesOptions 
            isClearable
            placeholder="Species"
            name="species"
            speciesClass={classification} 
            changeHandler={setSpecies} />
        </div>

        <div className="field field__location">
          <div className="field-status">
            <h3>Location:</h3>
            {(showRequiredMsg && !location) && <span className="required">Required field</span>}
          </div>
          <LocationsOptions 
            isClearable 
            fieldName="location" 
            changeHandler={setLocation} />
        </div>
        <div className="field field__observer">
          <div className="field-status">
            <h3>Observer</h3>
            {showRequiredMsg && (observer === null || !observer.label) && <span className="required">Required field</span>}
          </div>
          <ObserverOptions fieldName="observer" changeHandler={setObserver} />
        </div>
        <div className="field field__date">
          <div className="field-status">
            <h3>Dates</h3>
            {showRequiredMsg && !date && <span className="required">Start date is required</span>}
          </div>
          <DateRangePicker
            startDate={date} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={dateTo} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={onDatesChange} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
            isOutsideRange={() => false}
            showClearDates
            block
          />      
        </div>

        <div className="field field__altlocation">
          <ExpandPanel heading="Alternative Location">
            <div className="altlocation">
              <MapContainer setLatlng={setLatlng} />
              </div>
            </ExpandPanel>
        </div>
                        
        <div className="field field__starttime">
          <h3>Start time</h3>
          <Select 
            isClearable
            onChange={onStartTimeChange} 
            options={times} />
        </div>
        <div className="field field__endtime">
          <h3>End time</h3>
          <Select 
            isClearable
            onChange={onEndTimeChange} 
            options={times} />
        </div>
        <div className="field field__count">
          <h3><label htmlFor="count">Count</label></h3>             
          <input 
            type="number" 
            className="input" 
            name="count" 
            value={count} 
            onChange={e => setCount(e.target.value)} />
        </div>
        <div className="field field__notes">
          <h3>Notes</h3>
          <textarea
            rows={3} 
            className="input textarea" 
            name="notes" 
            value={notes} 
            onChange={e => setNotes(e.target.value)} />
        </div>
                      
        <div className="field field__images">        
          <ImageUploading 
            images={images} 
            uploading={uploading} 
            handleFiles={handleFiles}
            deleteImage={deleteImage} />       
        </div> 

        <div className="field field__breeding">
          <ExpandPanel heading="Breeding Code">
            <BreedingOptions currentBreedingCode={breedingCode} changeHandler={e => setBreedingCode(e.target.value)} />
          </ExpandPanel>           
        </div>

        <div className="field field__submit">
          <button 
            className="button__submit" 
            type="submit">{mutationLoading ? 'Submitting' : 'Submit'}</button>
        </div>
      </StyledRecordsForm>
    )
  }


export default CreateRecordForm