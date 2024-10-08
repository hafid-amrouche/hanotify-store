import React, { memo } from 'react'
import { useProductContext } from './store/product-context'
import { translaste } from '../../utils/utils'

const ProductIntro = memo(() => {
  const {productData} =useProductContext()
  return (
    <div>
        <h2 style={{lineHeight:1.4}}>
          {productData.title}

          { productData.discount &&
            <span style={{
              backgroundColor: 'var(--primaryColor)',
              color: 'var(--backgroundColor)',
              padding: '0 6px',
              margin:'0 8px',
              fontSize:14,
              whiteSpace:'nowrap',
              borderRadius: 'var(--border-radius-2)'
            }}>{ productData.discount }</span>
          }
        </h2>   
        { productData.miniDescription &&  <p style={{lineHeight:1.4, marginTop:8}}>
          {productData.miniDescription}
        </p>}     
        <div className='d-flex align-items-center gap-3'>
          { !productData.price ? '' : <h2 className='number' style={{color: 'var(--primaryColor)'}}>{productData.price} {translaste('DA')}</h2>}
          { !productData.originalPrice  ? '' : <h3 className='old-price'>{productData.originalPrice} { translaste('DA') }</h3>}
          { !productData.price && !productData.originalPrice  && <h3 style={{color: 'red'}}>{ translaste('No price available !') }</h3> }
        </div>       
    </div>
  )
}
)
export default ProductIntro