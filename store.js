import { createStore } from 'redux'
import rootReducer from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_MORE_MENU_ID':
//       return {
//         ...state,
//         moreMenuId: action.moreMenuId,
//         moreMenuIsOpen: !!action.moreMenuIsOpen
//       }    
//     default:
//       return state
//   }
// }

export const initializeStore = (preloadedState = initialState) => {
  return createStore(rootReducer, preloadedState, devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  ))
}