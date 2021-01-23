export const initialState = {
  data: null,
  sort_type: 'cost',
  orders_by_day: null,
  orders_by_product: null,
  orders_by_supplier: null,
  orders_by_delivery_date: null,
  selected_supplier: null,
  selected_product_category_1: null,
  selected_product_category_2: null,
}

const reducer = (state, action) => {
  console.log({
    action
  })

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
      // console.log(action.orders_by_day)
      return {
        ...state,
        orders_by_day: action.orders_by_day,
      }
    default:
      return state
  }
}

export default reducer;