import React from 'react'
import ImageSlider from '../components/ImageSlider'

const ProductPageInner=()=>{
  return(
    <div style={{ top: 64, borderRadius: 'var(--border-radius-3)', overflow: 'hidden'}} className='p-sticky-md border' id='image-slider__container'>
      <ImageSlider fullscreen/>
    </div> 
  )
}

const ProductPage = () => {
  return (
      <ProductPageInner/>
  )
}

export default ProductPage