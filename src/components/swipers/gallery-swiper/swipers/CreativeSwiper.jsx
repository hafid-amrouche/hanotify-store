import React  from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCreative } from 'swiper/modules';

// Import conditionally
import 'swiper/css';
import 'swiper/css/effect-creative';
import ProductCard from '../components/ProductCard';
import { useStoreContext } from '../../../../store/store-context';
import SwiperImageCard from '../components/SwiperImageCard'

const CreativeSwiper=({section})=>{
    const {device} = useStoreContext()

    const isSectionProductsContainer = section.type === 'products-container'
    const isSectionSwiper = section.type === 'swiper'

    const sectionDesign = 
    isSectionProductsContainer ? section.design[device] :
    isSectionSwiper ? section.design:
    {}

    const [justifyContent, width] = isSectionProductsContainer ? [
        sectionDesign.products.justifyContent,
        sectionDesign.products.product.width,
    ] : [
        sectionDesign.justifyContent,
        sectionDesign.image.width,
    ]
    
    const props = {
        pagination: {
            clickable: true,
        },
        grabCursor: true,
        className: "mySwiper2",
        centerInsufficientSlides:  justifyContent === 'center' || justifyContent === 'space-evenly',

        effect: 'creative',
        creativeEffect: {
          prev: {
            translate: ['-100%', 0, -500],
          },
          next: {
            translate: ['100%', 0, -500],
          },
        },
        style: {
            width: width,
            overflow: 'unset'
        },
        modules: [EffectCreative],
        slidesPerView: 1,
        spaceBetween: 0,
    }

    return(
        <div 
        style={{overflowX: 'clip'}}
    >
        <Swiper
            {
                ...props
            }
            
        >
            { isSectionProductsContainer && section.products?.map(product=>
                <SwiperSlide 
                    key={product.product_id}
                    style={{width: '100%'}}
                >
                    <ProductCard sectionDesign={sectionDesign} product={product} />
                </SwiperSlide>
            )}
            { isSectionSwiper && section.imageObjects?.map(imageObject=>
                <SwiperSlide 
                    key={imageObject.url}
                    style={{width: '100%'}}
                >
                    <SwiperImageCard sectionDesign={sectionDesign} imageObject={imageObject} />
                </SwiperSlide>
            )}
        </Swiper>
    </div>
    )
}
export default CreativeSwiper