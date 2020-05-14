import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setMenuId } from '../actions'
import { format } from 'date-fns';
import StyledRecord from './styles/StyledRecord'
import RecordOptions from './RecordOptions'
import Icon from './Icon'
import { func } from 'prop-types';

const mapStateToProps = state => ({
  popupMenuId: state.popupMenu.id
})

const mapDispatchToProps = dispatch => ({
  setMenuId: bindActionCreators(setMenuId, dispatch)
})

class Record extends Component {
  state = {
    openMenu: false,
    openPanel: false
  }

  openPanel = (e) => {
    this.setState({ openPanel: !this.state.openPanel })
  }

  openMenu = (e) => {
    e.preventDefault()    
    if (this.state.openMenu && this.popupTrigger.contains(e.target)) {
      this.setState({ openMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    } 
    else {
      this.setState({ openMenu: true }, () => {
        document.addEventListener('click', this.closeMenu)
      })
    }    
  }

  closeMenu = (e) => {
    if (this.popupTrigger && !this.popupTrigger.contains(e.target)) {
      this.setState({ openMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render (props) {
    const { record } = this.props
    const { 
      id,
      species: {
        name
      },
      location: {
        site,
        gridRef
      },
      status,
      author: {
        name: authorrName
      }, 
      legacyObserver,
      count,
      date,
      startTime,
      notes,
      breeding_code,
      images = []
    } = record    
    const collapsedStatus = this.state.openPanel ? 'open' : 'closed'
    return (
      <StyledRecord className={`record ${collapsedStatus}`}>
        <div className="record-data" onClick={(e) => this.openPanel(e)}>
          <div className="row first">
            <div className="cell date">{format(new Date(date), 'dd/MM/yyyy')}</div>
            <div className="cell species">{name}</div>
            <div className="cell location">{site}</div> 
            <div className="cell count">{count}</div>
            <div className={`cell observer ${authorrName === 'Legacy' ? 'legacy-observer' : ''}`}>
              {authorrName === 'Legacy' ? `${legacyObserver}` : authorrName}
            </div>
            
          </div>
          <div className="expandpanel__content">
            <div className="row second">
              <div className="cell times">Times: {startTime}</div> 
              <div className="cell breeding_code">Breeding code: {breeding_code ? breeding_code.code : ''}</div> 
              <div className="cell gridref">Grid ref: {gridRef}</div>           
            </div>
            {notes && <div className="row third">
              <div className="cell notes">Notes: {notes}</div>
            </div>}
            {images.length > 0 && <div className="row fourth">
              <div className="cell images">Images: {
                images.map((img, index) => (
                  <a className="image-link" key={`image-${index}`} href={img.src} target="_blank">{index + 1}</a>
                ))
              }</div>
            </div>}
          </div>
        </div>
                
        <div className="record-options">                     

          <div onClick={(e) => this.openPanel(e)} className="cell view-more" >
            <Icon   
              className="more__icon" 
              name="down-arow" /> 
          </div>

          <div className="cell crud-options">
            <div 
              className="popup-trigger"
              ref={el => this.popupTrigger = el}
              onClick={e => this.openMenu(e)}>
              <Icon   
                className="more__icon" 
                name="more_vert" />            
            </div> 
            {this.state.openMenu && <RecordOptions recordId={id} />}                    
          </div>

        </div>
                          
      </StyledRecord>
    )
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Record)