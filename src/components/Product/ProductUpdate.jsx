import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../contexts/MainContext';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';


const ProductUpdate = () => {
    const {productToEdit, saveProduct, editProduct} = useContext(mainContext)
    const {id} = useParams()
    const [inpTitle, setInpTitle] = useState('');
    const [inpPrice, setInpPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState(productToEdit.image);
    const navigate = useNavigate();

    useEffect(() => {
        editProduct(id)
    }, [])
    
    useEffect(() => {
        setInpTitle(productToEdit.title);
        setInpPrice(productToEdit.price);
        setSelectedFile(productToEdit.image);
    },[productToEdit])

    function editItems(){
        let form_data = {}
        form_data.id = id
        form_data.title = inpTitle
        form_data.price = inpPrice
        if (typeof selectedFile !== "string"){
            form_data.image = selectedFile
        }
        try{
            saveProduct(form_data)
            navigate(`/product/${id}`)
        }catch{
            navigate('/login')
        }
    }

    return (
        <>
            {inpTitle ? (
            <div className="inner">
                <img src={productToEdit.image} style={{'width':'90%'}} />
                    <h1>Edit Product: </h1>
                    <input value={inpTitle} onChange={(e) => setInpTitle(e.target.value)} type="text" />
                    <br></br>
                    <input value={inpPrice} onChange={(e) => setInpPrice(e.target.value)} type="text" />
                    <br></br> 
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <button onClick={editItems}>Edit</button>
            </div>
            ) : (null)}
        </>
    );
};

export default ProductUpdate;