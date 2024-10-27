import React from 'react'
import { useStoreContext } from '../../store/store-context'
import ProductsSwiper from './ProductsSwiper'
import { translaste } from '../../utils/utils'

const GallerySection = ({section}) => {

    const {device, theme} = useStoreContext() 

    const sectionDesign = section.design[device]

    // title 
    const titleDesign = sectionDesign.title
    const {
        showTitle,
        size: titleSize,
        direction,
        padding,
        label: {
            color: titleLabelColorObject,
        },
    } = titleDesign
    const titleLabelColor = titleLabelColorObject[theme]

    return(
        <div >
            { showTitle && 
                <div className='d-flex g-2 align-items-center color-primary' style={{ justifyContent: direction, color: titleLabelColor, padding}}>
                    <h4 style={{fontSize: titleSize, color: titleLabelColor}} >{ translaste(section.title )}</h4>
                </div>
            }
             <ProductsSwiper section={section} />
        </div>     
    )
}

export default GallerySection