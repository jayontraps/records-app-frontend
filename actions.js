export const setMenuId = (id) => {
  return {
      type: "SET_MENU_ID",
      payload: id
  }
}

export const setDialog = (payload) => {
  return {
      type: "SET_DIALOG",
      payload
  }
}


export default {
  setMenuId
}
