import React from 'react'
import {useStoreContext} from '../store/store-context'
import { translaste } from '../utils/utils'
import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'

const ProductCard = ({product}) => {
    const {storeData} = useStoreContext()
  return (
    <Link 
        style={{
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'var(--border-radius-2)',
            width: 152
        }}
        className='hover-scale'
        to={`/redirect?redirect=/products/${product.slug}/${product.product_id}`}
    >
        <LazyImage
            src={product.image || storeData.logo}
            style={{
                width: 150,
                height: 151,
                borderBottom: '1px solid var(--border-color)',
                objectFit: 'cover'
            }}
        />
        <div className='px-2'>
            <h4 className='cut-text'>{ product.title }</h4>
            <div className='d-flex gap-2'>
                <h5 className='color-primary'>{ product.price || 0 } { translaste('DA') }</h5>
                {product.originalPrice && <h5 className='old-price'>{ product.originalPrice  } { translaste('DA') }</h5>}
            </div>
        </div>
            
       
    </Link>
  )
}

export default ProductCard