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
    openMenu: false
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
        site
      },
      status,
      author: {
        name: authorrName
      }, 
      legacyObserver,
      count,
      date,
      notes,
      breeding_code
    } = record
    
    return (
      <StyledRecord className="record">
        <div className="cell species">{name}</div>      
        <div className={`cell observer ${authorrName === 'Legacy' ? 'legacy-observer' : ''}`}>
        {authorrName === 'Legacy' ? `${legacyObserver}` : authorrName}</div>
        <div className="cell count">{count}</div>
        <div className="cell date">{format(new Date(date), 'dd/MM/yyyy')}</div>
        <div className="cell location">{site}</div>      
        <div className="cell notes">{notes}</div>
        <div className="cell more">
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
      </StyledRecord>
    )
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Record)