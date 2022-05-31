import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { mainContext } from '../../contexts/MainContext';

const ProductDetail = () => {
    const { exactproduct, 
        getExactProductData,
        deleteProduct,
        editProduct
    } = useContext(mainContext)
    const navigate = useNavigate();

    const {id} = useParams()

    useEffect(() => {
        getExactProductData(id)
        if (exactproduct.id){
            navigate(`/product/${exactproduct.id}`)
        }
    }, [])

    if (exactproduct.title){
        return(
        <div>
            <div className='card'>
                <img src={exactproduct.image} className='card-img-top' alt="..." style={{'width': '250px', 'height': 'auto'}}/>
                <div className='card-body'>
                    <p className='card-title'>{exactproduct.title}</p>
                    <p className='card-text'>{exactproduct.author}</p>
                    <p className='card-text'>{exactproduct.price}</p>
                </div>
            </div>
            { exactproduct.is_author ?  (
                <>
                    <button onClick={() => deleteProduct(id)}>Delete</button>
                    <Link to={`/product-update/${id}`}><button onClick={() => getExactProductData(id)}>Edit</button></Link>
                </>
                ): ''
            }
        </div>
    )}else{return(null)}

};

export default ProductDetail;