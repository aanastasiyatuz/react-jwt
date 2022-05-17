import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inpUsername, setUsername] = useState('');
    const [inpPassword, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const registerUser = async (newUser) => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        try{
            const res = await axios.post(`http://35.239.251.89/api/token/`, newUser, config)
            const {access, refresh} = res.data
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            navigate('/check-token')
        }catch(error){
            setErrors(typeof error.response.data === 'string' ?  error.response.data : error.response.data.detail)
        }
    }

    function handleClick(){
        const form_data = new FormData()
        form_data.append('username', inpUsername)
        form_data.append('password', inpPassword)
        console.log(form_data, inpUsername, inpPassword)
        registerUser(form_data)
    }

    return (
        <div className="inner">
            <section>
                <div>
                    {errors}
                </div>
                <h2>Login</h2>
                <div className="fields">
                    <div className="field">
                        <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" key="username" placeholder="*Username" />
                    </div>
                    <div className="field">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" key="password" placeholder="*Password"/>
                    </div>
                    <button onClick={handleClick}>Login</button>
                </div>
            </section>
        </div>
    )

}

export default Login;