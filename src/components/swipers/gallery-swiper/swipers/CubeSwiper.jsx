import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCube } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import ProductCard from '../components/ProductCard';
import { useStoreContext } from '../../../../store/store-context';
import SwiperImageCard from '../components/SwiperImageCard'

const CubeSwiper=({section})=>{
    const {device} = useStoreContext()

    const isSectionProductsContainer = section.type === 'products-container' ||section.type=== 'category'
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
        className: "mySwiper",
        centerInsufficientSlides:  justifyContent === 'center' || justifyContent === 'space-evenly',
  
        effect: 'cube',
        cubeEffect: {
          shadow: false,
          slideShadows: false,
        },
        pagination: true,
        modules: [EffectCube],
        style: {
            width,
            overflow: 'unset'
        },
        spaceBetween: 0
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
                    style={{width: '100%', }}
                >
                    <ProductCard sectionDesign={sectionDesign} product={product} />
                </SwiperSlide>
            )}
            { isSectionSwiper && section.imageObjects?.map(imageObject=>
                <SwiperSlide 
                    key={imageObject.url}
                    style={{width: '100%', }}
                >
                    <SwiperImageCard sectionDesign={sectionDesign} imageObject={imageObject} />
                </SwiperSlide>
            )}
        </Swiper>
    </div>
    )
}

export default CubeSwiper