const initialState = {
  id: ''
}

const popupMenu = (state = initialState, action) => {
  switch(action.type){
      case "SET_MENU_ID":
          return {
              ...state,
              id: action.payload
          }     
      default:
          return state
  }
}

export default popupMenu;
