import React, { createContext, useContext, useReducer } from "react";
import { fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();

export const StateContext = createContext();

export const actionType = {
    SET_USER : 'SET_USER',

}

export const initialState = {
    user : userInfo,

    
};



export const reducer = (state, action) => {
  // your reducer function here
  //console.log(action);

  switch(action.type){
    case actionType.SET_USER: 
            return {
                ...state,
                user : action.user,
            };

    default :
    return state;
}
};

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const DispatchContext = createContext();
