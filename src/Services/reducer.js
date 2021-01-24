export const initialState = {
  data: null,
  orders_by_day: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
      }
    case 'SET_ORDERS_BY_DAY':
      return {
        ...state,
        orders_by_day: action.orders_by_day,
      }
    default:
      return state
  }
}

export default reducer;