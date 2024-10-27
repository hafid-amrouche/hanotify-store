import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';


// Import conditionally
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../components/ProductCard';
import { useStoreContext } from '../../../../store/store-context';
import SwiperImageCard from '../components/SwiperImageCard'


const DefaultSwiper=({section})=>{
    const {device} = useStoreContext()

    const isSectionProductsContainer = section.type === 'products-container' || section.type=== 'category'
    const isSectionSwiper = section.type === 'swiper'

    const sectionDesign = 
    isSectionProductsContainer ? section.design[device] :
    isSectionSwiper ? section.design:
    {}

    const [justifyContent, gap, cssWidth] = isSectionProductsContainer ? [
        sectionDesign.products.justifyContent,
        sectionDesign.products.gap,
        sectionDesign.products.product.width,
    ] : [
        sectionDesign.justifyContent,
        sectionDesign.gap,
        sectionDesign.image.width,
    ]

    const [slidesPerView, setSliderPerView] = useState(1)
    const [swiperWidth, setSwiperWidth] = useState(0)

    const swiperRef= useRef()
    const checkSwiperWidth = ()=>{
        const newSwiperWidth = (swiperRef.current?.getBoundingClientRect().width )|| 0
        setSwiperWidth(newSwiperWidth)
    }

    useEffect(()=>{
        let slidesPerView;
        if (cssWidth[cssWidth.length - 1] === '%'){
            const per = Number(cssWidth.slice(0, cssWidth.length -1))
            slidesPerView = 100/ per
        }
        else {
            const width = Number(cssWidth.slice(0, cssWidth.length - 2))
            slidesPerView = swiperWidth/ width
        }
        setSliderPerView(slidesPerView)
    }, [swiperWidth, cssWidth])

    useEffect(()=>{
        window.addEventListener('resize', checkSwiperWidth);
        checkSwiperWidth()
        return () => {
            window.removeEventListener('resize', checkSwiperWidth);
        };
    }, [])

    const modulesList = isSectionSwiper ? [Navigation, Pagination] : [Navigation]
    const props={
        spaceBetween: gap,
        pagination: {
            clickable: true,
        },
        grabCursor: true,
        className: "mySwiper",
        style: {
            width:'100%',
            overflow: 'unset'
        },
        centerInsufficientSlides:  justifyContent === 'center' || justifyContent === 'space-evenly',
        slidesPerView: slidesPerView,            
        modules: modulesList,    
        navigation: true
    }
        
    return(
        <div 
            style={{overflowX: 'clip'}}
            ref={swiperRef}
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

export default DefaultSwiper