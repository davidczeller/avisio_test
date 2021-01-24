export const initialState = {
  data: null,
  sort_type: 'cost',
  orders_by_day: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
      }
    case 'SET_SORT_TYPE':
      return {
        ...state,
        sort_type: action.sort_type,
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