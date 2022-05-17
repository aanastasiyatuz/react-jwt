import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Check = () => {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState('');
    let flag = true;
    const navigate = useNavigate();

    const refreshToken = async () => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let refresh = localStorage.getItem('refresh')
        try{
            const res = await axios.post('http://35.239.251.89/api/token/refresh/', {refresh}, config)
            const {access} = res.data
            localStorage.setItem('access', access)
        }catch(error){
            setErrors(error)
        }
    }

    const checkToken = async () => {
        let access = localStorage.getItem('access')
        if (!access) navigate('/login')
        const config = {
            headers: { 
                'Authorization': `Bearer ${access}`
            }
        }
        try{
            await axios.get(`http://35.239.251.89/check-token/`, config)
            setSuccess(true)
            setErrors('')
        }catch(error){
            if (flag) {
                refreshToken()
                flag = false;
                checkToken()
            }
            setErrors(typeof error.response.data === 'string' ?  error.response.data : error.response.data.detail)
        }
    }

    return (
        <div style={{"width":"100vw", "height":"100vh", "display":"flex", "alignItems":"center", "justifyContent":"center"}}>
            <div className="card" style={{"width": "50vw"}}>
                <div className='card-body'>
                    <p style={{"color":"red"}}>{errors ? errors : ''}</p>
                    <p style={{"color":"green"}}>{success ? 'success' : ''}</p>
                    <h2>Check token</h2>
                    <button onClick={checkToken} className="btn btn-light" style={{"width":"100%"}}>Check</button>
                </div>
            </div>
        </div>
    )

}

export default Check;