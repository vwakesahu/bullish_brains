import React, { useState, createContext, useContext } from 'react';

const Wallet =createContext(); 
export const Wallprovider = ({children}) => {  
    const [balance,setBalance]=useState(10000);
    const [stocks,setStocks]=useState(4000);
    const [bonds,setBonds]=useState(2000);
    const [mfund,setMfund]=useState(3000);
    const [crypto,setCrypto]=useState(9000);


  return (
    <Wallet.Provider value={{balance,setBalance, stocks,setStocks, bonds,setBonds, mfund,setMfund, crypto,setCrypto}}>
        {children}
    </Wallet.Provider>
  );
};

export const Wall= () =>{
  return(useContext(Wallet));
}