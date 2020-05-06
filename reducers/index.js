import popupMenu from './popupMenu'
import dialog from './dialog'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  popupMenu,
  dialog
})

export default rootReducer
