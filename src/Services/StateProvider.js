import React, {
  createContext,
  useContext,
  useReducer
} from 'react';

export const DataLayerContex = createContext()

export const StateProvider = ({ initialState, reducer, children }) => (
  <DataLayerContex.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContex.Provider>
)

export const useStateProviderValue = () => useContext(DataLayerContex)