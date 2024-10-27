import React from 'react'
import { useStoreContext } from '../store/store-context'
import GallerySection from './block-section/GallerySection'
import ProductsSwiper from './block-section/ProductsSwiper'
import classes from './BlockSection.module.css'

const BlockSection = ({section}) => {
    const { device, theme, } = useStoreContext() 
    const isSectionProductsContainer = section.type === 'products-container' || section.type === 'category'
    const isSectionSwiper = section.type === 'swiper'
    if (!section.device.includes(device)) return 
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
                    width: '100%',
                    margin: 'auto'
                }}
            >
                {(section.type==='products-container' || section.type=== 'category' ) && <GallerySection section={section} />}
                {section.type==='swiper' && <ProductsSwiper  section={section} />}  {/* // Means general swiper */}
                
            </div>
        </div>
    )
}

export default BlockSection