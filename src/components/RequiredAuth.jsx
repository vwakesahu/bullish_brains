import React from 'react'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { useNavigate } from 'react-router-dom'



const RequiredAuth = ({children}) => {
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/sign-up')
        }
    }, [])


    return (
       <>
       {children}
       </>
    )
}

export default RequiredAuth