import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Check = () => {
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
        }catch{
            navigate('/login')
        }
    }

    const registerUser = async () => {
        let access = localStorage.getItem('access')
        const config = {
            headers: { 
                'Authorization': `Bearer ${access}`
            }
        }
        try{
            await axios.get(`http://35.239.251.89/check-token/`, config)
            setErrors("SUCCESS")
        }catch(error){
            if (flag) {
                refreshToken()
                flag = false;
                registerUser()
            }
            setErrors(typeof error.response.data === 'string' ?  error.response.data : error.response.data.detail)
        }
    }

    return (
        <div className="inner">
            <section>
                <div>
                    {errors}
                </div>
                <h2>Check</h2>
                <div className="fields">
                    <button onClick={registerUser}>Check</button>
                </div>
            </section>
        </div>
    )

}

export default Check;