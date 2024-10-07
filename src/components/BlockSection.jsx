import React from 'react'
import { useStoreContext } from '../store/store-context'
import GallerySection from './block-section/GallerySection'
import ProductsSwiper from './block-section/ProductsSwiper'
import classes from './BlockSection.module.css'

const BlockSection = ({section}) => {
    const { device, theme } = useStoreContext() 
    const isSectionProductsContainer = section.type === 'products-container'
    const isSectionSwiper = section.type === 'swiper'
    if (isSectionSwiper && section.device !== device) return 
    const sectionDesign = 
        isSectionProductsContainer ? section.design[device]:
        isSectionSwiper ? section.design:
        {}
    const marginTop = sectionDesign.marginTop
    const marginHorizontal = sectionDesign.marginHorizontal
    const backgroundColor = 
    isSectionProductsContainer ?  sectionDesign.backgroundColor[theme] : 
    isSectionSwiper ? sectionDesign.backgroundColor[theme]: 
    undefined
    return(
        <div 
            key={section.id} 
            id={'section-' + section.id}
            className={'cursor-pointer ' + classes['block-section'] }
            style={{
                padding: `${marginTop}px ${marginHorizontal}px 0 ${marginHorizontal}px`, 
                minHeight: 80,
                backgroundColor,
            }}
        >
            <div
                style={{
                    maxWidth: 1340,
                    margin: 'auto'
                }}
            >
                {section.type==='products-container' && <GallerySection section={section} />}
                {section.type==='swiper' && <ProductsSwiper  section={section} />}
            </div>
        </div>
    )
}

export default BlockSection