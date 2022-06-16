import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import URL from '../../Config';
import { ToastContainer, toast } from 'react-toastify';

const Check = () => {
    let flag = true;
    const navigate = useNavigate();
    const notify = (error, success) => {
        if (success) {
            toast.success(Object.values(error).toString().replace(/,/gi, ''), {
                icon: false, theme: "dark"
            });
        } else {
            toast.error(Object.values(error).toString().replace(/,/gi, ''), {
                icon: false, theme: "dark"
            });

        }
    }

    const refreshToken = async () => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let refresh = localStorage.getItem('refresh')
        try {
            const res = await axios.post(`${URL}/account/token/refresh/`, { refresh }, config)
            const { access } = res.data
            localStorage.setItem('access', access)
        } catch (error) {
            notify('please log in again')
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
        try {
            await axios.get(`${URL}/account/check-token/`, config)
            notify("Using token", true)
        } catch (error) {
            if (flag) {
                refreshToken()
                flag = false;
                checkToken()
            }
            // notify(error.response.data.detail)
        }
    }

    return (
        <div style={{ "width": "100vw", "height": "100vh", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
            <div className="card" style={{ "width": "50vw" }}>
                <div className='card-body'>
                    <h2>Check token</h2>
                    <button onClick={checkToken} className="btn btn-light" style={{ "width": "100%" }}>Check</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default Check;