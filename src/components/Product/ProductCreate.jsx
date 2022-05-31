import React, { useContext, useState } from 'react';
import { mainContext } from '../../contexts/MainContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [inpTitle, setInpTitle] = useState('Title');
    const [inpDescription, setInpDescription] = useState('Description');
    const [inpPrice, setInpPrice] = useState('Price');
    const [selectedFile, setSelectedFile] = useState({});
    let { addProduct, exactproduct } = useContext(mainContext)
    const navigate = useNavigate();

    async function handleClick() {
        const newObj = {}
        newObj['title'] = inpTitle
        newObj['description'] = inpDescription
        newObj['image'] = selectedFile
        newObj['category'] = 1
        newObj['price'] = inpPrice
        await addProduct(newObj)
        
        navigate(`/product/${exactproduct?.id}`)
    }

    return (
        <div classTitle="inner">
            <h1>Add Product: </h1>
            <input value={inpTitle} onChange={(e) => setInpTitle(e.target.value)} type="text" />
            <br></br>
            <input value={inpDescription} onChange={(e) => setInpDescription(e.target.value)} type="text" />
            <br></br>
            <input value={inpPrice} onChange={(e) => setInpPrice(e.target.value)} type="text" />
            <br></br>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddProduct;