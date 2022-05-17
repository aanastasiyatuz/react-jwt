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
        if (!inpUsername) setErrors("Enter username")
        else if (!inpPassword) setErrors("Enter password")
        else{
            form_data.append('username', inpUsername)
            form_data.append('password', inpPassword)
            registerUser(form_data)
        }
    }

    return (
        <div style={{"width":"100vw", "height":"100vh", "display":"flex", "alignItems":"center", "justifyContent":"center"}}>
            <div className="card" style={{"width": "50vw"}}>
                <div className='card-body'>
                    <p style={{"color":"red"}}>{errors ? errors : ''}</p>
                    <h2>Login</h2>
                    <div className="mb-3">
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} name="username" key="username" placeholder="*Username" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} name="password" key="password" placeholder="*Password"/>
                    </div>
                    <button onClick={handleClick} className="btn btn-light" style={{"width":"100%"}}>Login</button>
                </div>
            </div>
        </div>
    )

}

export default Login;