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
        sort_type: action.sort_type,
      }
    case 'SET_ORDERS_BY_DAY':
      return {
        ...state,
        orders_by_day: action.orders_by_product,
      }
    case 'SET_ORDERS_BY_PRODUCT':
      return {
        ...state,
        orders_by_product: action.orders_by_product,
      }
    case 'SET_ORDERS_BY_SUPPLIER':
      return {
        ...state,
        orders_by_supplier: action.orders_by_supplier,
      }
    case 'SET_ORDERS_BY_DELIVERY_DATE':
      return {
        ...state,
        orders_delivery_date: action.orders_delivery_date,
      }
    case 'SET_SELECTED_SUPPLIER':
      return {
        ...state,
        selected_supplier: action.selected_supplier,
      }
    case 'SET_SELECTED_PRODUCT_CATEGORY_1':
      return {
        ...state,
        selected_product_category_1: action.selected_product_category_1,
      }
    case 'SET_SELECTED_PRODUCT_CATEGORY_2':
      return {
        ...state,
        selected_product_category_2: action.selected_product_category_2,
      }
    default:
      return state
  }
}

export default reducer;