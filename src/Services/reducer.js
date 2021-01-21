export const initialState = {
  data: null,
  sortType: 'cost'
}

const reducer = (state, action) => {
  // console.log({
  //   action
  // })

  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
      }
      case 'SET_SORT_TYPE':
      return {
        ...state,
        sortType: action.sortType,
      }
    default:
      return state
  }
}

export default reducer;