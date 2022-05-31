import React from 'react';
import axios from 'axios'

const Test = () => {
    const test = async () => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        const res = await axios.get(`https://backend-for-fs-makers.herokuapp.com/api/v1/docs/`, config)
        console.log(res)
    }

    return (
        <div style={{"width":"100vw", "height":"100vh", "display":"flex", "alignItems":"center", "justifyContent":"center"}}>
            <div className="card" style={{"width": "50vw"}}>
                <div className='card-body'>
                    <button onClick={test} className="btn btn-light" style={{"width":"100%"}}>Test</button>
                </div>
            </div>
        </div>
    )

}

export default Test;