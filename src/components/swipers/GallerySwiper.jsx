import React, { lazy }  from 'react'


import SuspenseComponent from '../SuspenseComponent'
import { useStoreContext } from '../../store/store-context'

const DefaultSwiperImport = ()=>import('./gallery-swiper/swipers/DefaultSwiper')
const DefaultSwiper = lazy(DefaultSwiperImport)

const CardsFlowSwiperImport = ()=>import('./gallery-swiper/swipers/CoverFlowSwiper')
const CoverFlowSwiper = lazy(CardsFlowSwiperImport)

const CoverFlowSwiperImport = ()=>import('./gallery-swiper/swipers/CardsFlowSwiper')
const CardsFlowSwiper = lazy(CoverFlowSwiperImport)

const CubeSwiperImport = ()=>import('./gallery-swiper/swipers/CubeSwiper')
const CubeSwiper = lazy(CubeSwiperImport)

const FlipSwiperImport = ()=>import('./gallery-swiper/swipers/FlipSwiper')
const FlipSwiper = lazy(FlipSwiperImport)

const CreativeSwiperImport = ()=>import('./gallery-swiper/swipers/CreativeSwiper') 
const CreativeSwiper = lazy(CreativeSwiperImport)

const GallerySwiper=({section})=>{
    // products
    const {device} = useStoreContext()
    
    const isSectionProductsContainer = section.type === 'products-container' || section.type=== 'category'
    const isSectionSwiper = section.type === 'swiper'
    
    const sectionDesign = 
    isSectionProductsContainer ? section.design[device] :
    isSectionSwiper ? section.design:
    {}


    const displeyType = isSectionProductsContainer ?  sectionDesign.products.productsDisplay : 
                        isSectionSwiper ? sectionDesign.swiperType: undefined

    return(
        <>
            { displeyType === 'swiper-1' &&  <SuspenseComponent fallback={false} Component={DefaultSwiper} section={section} /> }
            { displeyType === 'swiper-2' && <SuspenseComponent fallback={false} Component={CoverFlowSwiper} section={section}  />}
            { displeyType === 'swiper-3' && <SuspenseComponent fallback={false} Component={CardsFlowSwiper} section={section}  />}
            { displeyType === 'swiper-4' && <SuspenseComponent fallback={false} Component={CubeSwiper} section={section}  /> }
            { displeyType === 'swiper-5' && <SuspenseComponent fallback={false} Component={FlipSwiper} section={section}  /> }
            { displeyType === 'swiper-6' && <SuspenseComponent fallback={false} Component={CreativeSwiper} section={section}  /> }
        </>
         
    )
}
    

export default GallerySwiper