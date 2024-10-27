import React from 'react'
import { translaste } from '../utils/utils'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import Shirt from '../components/Shirt'


const ProductCard = ({product}) => {
    const Tag = product.slug ? Link : 'div'
  return (
    <Tag 
        style={{
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'var(--border-radius-1)',
            width: 152,
            overflow: 'hidden'
        }}
        // className='scale-on-hover'
        to={`/products/${product.slug}/${product.product_id}`}
    >
        { product.image !== null && <LazyImage 
            style={{
                width: '100%', 
                aspectRatio: 1, 
                objectFit: 'cover',
            }} 
            src={product.image}
        />}
        {product.image === null && <Shirt aspectRatio={1} fill={'var(--primaryColor)'} />}
        <div className='px-1'>
            <h4 className='cut-text'>{ product.title }</h4>
            <div className='d-flex gap-2'>
                <h5 className='color-primary'>{ product.price || 0 } { translaste('DA') }</h5>
                {product.originalPrice && <h5 className='old-price'>{ product.originalPrice  } { translaste('DA') }</h5>}
            </div>
        </div>
            
       
    </Tag>
  )
}

export default ProductCard