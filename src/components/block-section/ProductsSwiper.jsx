import React from 'react'
import { useStoreContext } from '../../store/store-context'
import GallerySwiper from '../swipers/GallerySwiper'
import SimpleSwiper from '../swipers/SimpleSwiper'

const ProductsSwiper=({section})=>{

    // products
    const {device} = useStoreContext()

    const isSectionProductsContainer = section.type === 'products-container' || section.type=== 'category'
    const isSectionSwiper = section.type === 'swiper'

    const sectionDesign = 
        isSectionProductsContainer ? section.design[device]:
        isSectionSwiper ? section.design:
        {}

    const displeyType = isSectionProductsContainer ?  sectionDesign.products.productsDisplay : 
                        isSectionSwiper ? sectionDesign.swiperType: undefined

    const swiperLength = isSectionProductsContainer ? section.products.length :
                         isSectionSwiper ? section.imageObjects.length: undefined

    return(
        <div>
            { swiperLength > 1 && displeyType !== 'simple' && <GallerySwiper section={section} />}
            {( swiperLength === 1 || displeyType === 'simple') && <SimpleSwiper section={section} />}
        </div>
    )
}

export default ProductsSwiper