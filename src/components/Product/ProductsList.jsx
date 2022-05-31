import React, { useContext } from 'react';
import { useEffect } from 'react';
import { mainContext } from '../../contexts/MainContext';

const ProductsList = () => {
    const { products, getProductsData } = useContext(mainContext)

    useEffect(()=>{
        getProductsData()
        console.log(products)
    },[])


    return (
        <div>
            {products.map(product => (
                <div className='card' key={product.id}>
                    <img src={product.image} className='card-img-top' alt="..." style={{'width': '250px', 'height': 'auto'}}/>
                    <div className='card-body'>
                        <p className='card-title'>{product.title}</p>
                        <p className='card-text'>{product.author}</p>
                        <p className='card-text'>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ProductsList;