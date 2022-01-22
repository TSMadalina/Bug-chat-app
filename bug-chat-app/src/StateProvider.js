import React, { createContext, useContext, useReducer } from 'react';

//used to push information in and pull it out
export const StateContext = createContext();

//children is our app; reducer listen any action done on its data (in our case the user) 
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//access information from the data layer (here we keep the user so we can 
//access it from every place in the app)
export const useStateValue = () => useContext(StateContext);