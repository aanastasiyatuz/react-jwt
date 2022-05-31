import React, { useReducer } from 'react';
import axios from 'axios'
export const authContext = React.createContext();

let URL = 'https://backend-for-fs-makers.herokuapp.com/api/v1/account'

const INIT_STATE = {
    is_auth:false,
}

const reducer = (state=INIT_STATE, action) => {

    switch(action.type){
        case "CHECK_AUTH": return {...state, is_auth: action.payload}
        default: return state
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    let flag = true;

    const checkToken = async () => {
        let access = localStorage.getItem('access')
        if (!access) {
            dispatch({
                type: "CHECK_AUTH",
                payload: false
            })
        }
        const config = {
            headers: { 
                'Authorization': `Bearer ${access}`
            }
        }
        try{
            await axios.get(`${URL}/check-token/`, config)
            dispatch({
                type: "CHECK_AUTH",
                payload: true
            })
        }catch(error){
            if (flag) {
                refreshToken()
                flag = false;
                checkToken()
            }else{
                dispatch({
                    type: "CHECK_AUTH",
                    payload: false
                })
            }
        }
    }

    const refreshToken = async () => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let refresh = localStorage.getItem('refresh')
        const res = await axios.post(`${URL}/token/refresh/`, {refresh}, config)
        const {access} = res.data
        localStorage.setItem('access', access)
    }

    return (
        <authContext.Provider value={{
            is_auth: state.is_auth,
            checkToken,
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;