import React, { useState, createContext, useContext } from 'react';

const Authe =createContext(); 
export const Authstock = ({children}) => {  
  const [stockName, setStockName] = useState(null);
  const [cname, setCname]= useState(null);


  return (
    <Authe.Provider value={{stockName , setStockName , cname, setCname}}>
        {children}
    </Authe.Provider>
  );
};

export const Authprovider= () =>{
  return(useContext(Authe));
}