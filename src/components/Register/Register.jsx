import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inpUsername, setUsername] = useState('');
    const [inpPassword, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const registerUser = async (newUser) => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        try{
            const res = await axios.post(`http://35.239.251.89/register/`, newUser, config)
            navigate('/login')
        }catch(error){
            setErrors(typeof error.response.data === 'string' ?  error.response.data : error.response.data.detail)
        }
    }

    function handleClick(){
        const form_data = new FormData()
        form_data.append('username', inpUsername)
        form_data.append('password', inpPassword)
        registerUser(form_data)
    }

    return (
        <div className="inner">
            <section>
                <div>
                    {errors ? errors : ''}
                </div>
                <h2>Create new account</h2>
                <div className="fields">
                    <div className="field">
                        <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" key="username" placeholder="*Username" />
                    </div>
                    <div className="field">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" key="password" placeholder="*Password"/>
                    </div>
                    <button onClick={handleClick}>Sign up</button>
                </div>
            </section>
        </div>
    )

}

export default Register;