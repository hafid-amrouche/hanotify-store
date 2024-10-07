import React from 'react'
import ProductCard from './simple-swiper/components/ProductCard'
import {useStoreContext} from '../../store/store-context'
import SwiperImageCard from './gallery-swiper/components/SwiperImageCard'


const SimpleSwiper = ({section}) => {
    const {device} = useStoreContext()
    const isSectionProductsContainer = section.type === 'products-container'
    const isSectionSwiper = section.type === 'swiper'

    const sectionDesign = 
    isSectionProductsContainer ? section.design[device] :
    isSectionSwiper ? section.design:
    {}

    const justifyContent = isSectionProductsContainer ? sectionDesign.products.justifyContent :
                           isSectionSwiper ? sectionDesign.justifyContent : 
                           undefined 
    
  return (
    <div className='d-flex flex-wrap' style={{
        justifyContent: justifyContent
    }}>
        {
          isSectionProductsContainer && section.products.map(product=><ProductCard key={product.product_id} product={product} sectionDesign={sectionDesign} />)
        }
        {
          isSectionSwiper && section.imageObjects.map(imageObj=><SwiperImageCard key={imageObj.url} imageObject={imageObj} sectionDesign={sectionDesign} />)
        }
    </div>
  )
}

export default SimpleSwiper