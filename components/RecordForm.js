import React, { useState, useEffect, useRef } from 'react'
import { ADD_RECORD, UPDATE_RECORD, DELETE_IMAGE } from '../mutations'
import { GET_USERS, GET_RECORDS, getRecordsVariables } from '../queries'
import { useMutation } from '@apollo/react-hooks';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Select from 'react-select'
import { setDialog } from '../actions'
import {
  ClassificationsOptions,
  LocationsOptions,
  SpeciesOptions,
  ObserverOptions,
  BreedingOptions,
  MapContainer,
  ImageUploading
} from './fields'
import ExpandPanel from '../components/ExpandPanel'
import StyledRecordsForm from './styles/StyledRecordsForm'
import { hours } from '../utils'


const times = hours.map(time => ({ value: time, label: time }))
const DPCenterPoint = {lat: '51.447105', lng: '-0.876939'}

const RecordForm = props => { 
  const dispatch = useDispatch()
  const { update, recordId }  = props
  const isUpdate = !!update
  const [classification, setClassification] = useState(isUpdate ? update.classification : '');
  const [observer, setObserver] = useState(isUpdate ? update.observer : '')
  const [species, setSpecies] = useState(isUpdate ? update.species : '')
  const [location, setLocation] = useState(isUpdate ? update.location : '')
  const [date, setDate] = useState(isUpdate ? update.date : null)  
  const [count, setCount] = useState(isUpdate ? update.count : '0')
  const [notes, setNotes] = useState(isUpdate ? update.notes : '')
  const [breedingCode, setBreedingCode] = useState(isUpdate ? update.breedingCode : '')
  const [startTime, setStartTime] = useState(isUpdate ? update.startTime : null)  
  const [images, setImages] = useState(isUpdate ? update.images : [])
  const [latlng, setLatlng] = useState(isUpdate ? update.latlng : DPCenterPoint)
  const [showRequiredMsg, setShowRequiredMsg] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [focused, setFocused] = useState(false)
  
  const { queryParams, parentEl } = props
  const variables = getRecordsVariables(queryParams)
  const submitButtonText = isUpdate ? 'Update' : 'Submit'
  const [deleteImageFromRecord] = useMutation(
    DELETE_IMAGE,
    {
      update(cache, { data: { deleteImageFromRecord: updatedRecord } }) {
        console.log('updatedRecord: ', updatedRecord)                       
      },
      onCompleted: () => {
        console.log('complete!');       
      }
    })

  const [
    addRecord,
    { loading: mutationLoading, error: mutationError, data: mutationDat }
  ] = useMutation(
    ADD_RECORD,
    {
      update(cache, { data: { createRecord } }) {
        console.log('createRecord: ', createRecord)
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
          query: GET_USERS
        });

        cache.writeQuery({
          query: GET_USERS,          
          data: { users: [createRecord.author, ...users] }
        });        
      },
      onCompleted: () => {
        console.log('complete!');
        props.setOpen(false);
        close();
      }
    })

    const [updateRecord] = useMutation(
      UPDATE_RECORD,
      {
        onCompleted: () => {
          console.log('complete!');
          props.setOpen(false);
          close();
        }
      }) 

  function close() {
    dispatch(setDialog({ id: '', action: ''}))
  }
  function onDateChange(date) {    
    setDate(date)
  }

  function onStartTimeChange(newValue, metaAction) {
    if (metaAction.action === 'select-option') {
      setStartTime(newValue)
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
        // extract what we need 
        const img = { 
          src: newImage.secure_url, 
          public_id: newImage.public_id,
          original_filename: newImage.original_filename
        }
        setImages(images => [...images, img])
      }      
    });    
    setUploading(false)
    console.log('Uploading done');
  }

  async function deleteImage(index) {
    const public_id = images[index].public_id 
    deleteImageFromRecord({ variables: { public_id: public_id }})
    let newImages = [...images]
    newImages.splice(index, 1)    
    setImages(newImages)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = date ? date.format() : null
            
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
          startTime: startTime ? startTime.value : null,
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

      // images
      if (isUpdate) {
        console.log('update.images: ', update.images)
        console.log('images: ', images)
        const dedupedImages = images.filter(val => !update.images.includes(val));
        console.log('dedupedImages: ', dedupedImages)

        const createArr = []
        dedupedImages.forEach(img => { 
          createArr.push({
            src: img.src,
            public_id: img.public_id,
            original_filename: img.original_filename,
            author
          })
        })
        vars.data.images = {
          create: createArr
        }
      } else {
        if (images.length) {     
          const createArr = []
          images.forEach(img => { 
            createArr.push({
              src: img.src,
              public_id: img.public_id,
              original_filename: img.original_filename,
              author
            })
          })
          vars.data.images = {
            create: createArr
          }
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
      // add the RecordWhereUniqueInput when we are updating the record 
      if (isUpdate) {
        vars.where = {
          id: recordId
        }
      }
  
      // console.log('vars: ', vars)

      isUpdate ? updateRecord({ variables: vars }) : addRecord({ variables: vars })

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
          <ClassificationsOptions 
            placeholder="Select class"
            name="class"
            value={classification} 
            changeHandler={setClassification} />
        </div>            
        
        <div className="field field__species">
          <div className="field-status">
            <h3>Species:</h3>
            {showRequiredMsg && !species && <span className="required">Required field</span>}
          </div>         
          <SpeciesOptions   
            value={species}
            placeholder="Select species"
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
            placeholder="Select location"
            value={location}
            isClearable 
            fieldName="location" 
            changeHandler={setLocation} />
        </div>

        <div className="field field__observer">
          <div className="field-status">
            <h3>Observer</h3>
            {showRequiredMsg && (observer === null || !observer.label) && <span className="required">Required field</span>}
          </div>
          <ObserverOptions 
            value={observer}
            fieldName="observer" 
            changeHandler={setObserver} />
        </div>

        <div className="field field__date">
          <div className="field-status">
            <h3>Date</h3>
            {showRequiredMsg && !date && <span className="required">Start date is required</span>}
          </div>
          <SingleDatePicker
            displayFormat="DD MM YYYY"
            date={date} 
            onDateChange={onDateChange} 
            focused={focused}
            onFocusChange={({focused}) => setFocused(focused)} 
            id="your_unique_id"
            isOutsideRange={() => false}
            numberOfMonths={1}
          />
        </div>

        <div className="field field__altlocation">
          <ExpandPanel heading="Map marker">
            <div className="altlocation">
              <MapContainer setLatlng={setLatlng} initialMarker={latlng} />
              </div>
            </ExpandPanel>
        </div>
                        
        <div className="field field__starttime">
          <h3>Time</h3>
          <Select 
            placeholder="Select time"
            value={startTime}
            isClearable
            onChange={onStartTimeChange} 
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

        {classification && classification.label === "Birds" && 
          <div className="field field__breeding">
            <ExpandPanel heading="Breeding Code">
              <BreedingOptions currentBreedingCode={breedingCode} changeHandler={e => setBreedingCode(e.target.value)} />
            </ExpandPanel>           
          </div>
          }

        <div className="field field__submit">
          <button 
            className="button__submit" 
            type="submit">{mutationLoading ? 'Submitting' : submitButtonText}</button>
        </div>
      </StyledRecordsForm>
    )
  }


export default RecordForm