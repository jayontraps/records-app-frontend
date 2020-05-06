const dialog = (state = {}, action) => {
  switch(action.type) {
      case "SET_DIALOG":
          return {
              ...state,
              ...action.payload
          }     
      default:
          return state
  }
}

export default dialog;
