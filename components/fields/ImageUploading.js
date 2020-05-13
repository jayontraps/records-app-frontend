import React from 'react'
import styled from 'styled-components'
import Spinner from '../Spinner'
import Icon from '../Icon'

const StyledImageUploading = styled.div`
.file {
    position: relative;
    display: inline-block;
    cursor: pointer;
    height: 2.5rem;
  }
  .file input {
    min-width: 14rem;
    margin: 0;
    filter: alpha(opacity=0);
    opacity: 0;
  }
  .file-custom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    height: 2.5rem;
    padding: .5rem 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    border: .075rem solid #ddd;
    border-radius: .25rem;
    box-shadow: inset 0 .2rem .4rem rgba(0,0,0,.05);
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  .file-custom:after {
    content: "Choose file...";
  }
  .file-custom:before {
    position: absolute;
    top: -.075rem;
    right: -.075rem;
    bottom: -.075rem;
    z-index: 6;
    display: block;
    content: "Browse";
    height: 2.5rem;
    padding: .5rem 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #eee;
    border: .075rem solid #ddd;
    border-radius: 0 .25rem .25rem 0;
  }

  /* Focus */
  .file input:focus ~ .file-custom {
    box-shadow: 0 0 0 .075rem #fff, 0 0 0 .2rem #0074d9;
  }

  .spinner {
    margin: 1rem 0;
  }
`

const StyledImageList = styled.ul`
  margin: 1rem 0;
  li {
    margin-bottom: .5rem;   
    display: flex;
    justify-content: space-between; 
  }
  .delete-image {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    &:hover {
      cursor: pointer;
    } 
    svg {
      width: 1.5rem;
      height: 1.5rem;    
    }
  }
  
`

const ImageUploading = props => {
  const { images, uploading, handleFiles, deleteImage } = props
  return (
    <StyledImageUploading>
      <h3>Images</h3>
      <label className="file">
        <input className="upload-input" type="file" id="fileElem" multiple accept="image/*" onChange={e => handleFiles(e)} aria-label="File browser example" />
        <span className="file-custom" />
      </label>
      {uploading && <Spinner />}
      {images && !uploading && <div id="gallery">
        <StyledImageList className="image-list">
          {images.map((img, index) => (
            <li key={`image-${index}`}>
              {img.original_filename}
              <span onClick={() => deleteImage(index)} className="delete-image">
                <Icon name="close" />
              </span>                   
            </li>
            )
          )}
        </StyledImageList>
    </div>}
    </StyledImageUploading>
  )
}

export default ImageUploading