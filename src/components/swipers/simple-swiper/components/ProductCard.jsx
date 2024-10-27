import React from 'react'
import { useStoreContext } from '../../../../store/store-context'
import { translaste } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import LazyImage from '../../../LazyImage'
import Shirt from '../../../../components/Shirt'


const ProductCard=({product, sectionDesign})=>{
    const {theme, device} = useStoreContext()
    const isMobile = device === 'mobile'
    const productsDesign =  sectionDesign.products
    
    const {
        gap,
        bordersRounded,
        borderColor: borderColorObject,
        backgroundColor: backgroundColorObject,
        borderWidth,
        product: {
            width,
            image: {
                aspectRatio,
                objectFit
            },
            title: {
                size : productTitleSize,
                color: titleColorObject
            },
            price: {
                size : productPriceSize,
                color: priceColorObject
            }
        }
    } = productsDesign

    const backgroundColor = backgroundColorObject[theme] === '#00000000' ? sectionDesign.backgroundColor[theme] : backgroundColorObject[theme]
    const borderColor = borderColorObject[theme]
    const titleColor = titleColorObject[theme]
    const priceColor = priceColorObject[theme]

    const borderRadius = isMobile ? 4 : 8

    const Tag = product.slug ? Link : 'div'
    return(
        <Tag to={`/products/${product.slug}/${product.product_id}`} style={{padding: gap/2, width}} 
        // className='scale-on-hover'
        >
            <div  
                style={{ 
                    overflow: 'hidden', 
                    borderRadius: bordersRounded ? borderRadius : undefined, 
                    border: `${borderWidth}px solid ${borderColor}`,
                }}>
                    <div
                        style={{
                            backgroundColor: backgroundColor,
                        }}
                    >
                        { product.image !== null && <LazyImage 
                            style={{
                                width: '100%', 
                                aspectRatio: aspectRatio, 
                                objectFit,
                            }} 
                            src={product.image}
                        />}
                        {product.image === null && <Shirt aspectRatio={aspectRatio} fill={'var(--primaryColor)'} />}
                        <div className='px-1'>
                            <h4 className='cut-text' style={{fontSize: productTitleSize, color: titleColor}}>{ product.title }</h4>
                            {  product.price ? 
                                <div className='d-flex justify-content-between'>
                                    <h4 style={{color: priceColor, fontSize: productPriceSize}}>{ product.price } {translaste('DA')} </h4>
                                    { product.original_price && <h4 style={{fontSize: productPriceSize, color: 'var(---greyColor)', textDecoration: 'line-through', fontSize: productPriceSize}}>{ product.original_price } {translaste('DA')} </h4>}
                                </div>:
                                <h4 style={{color: 'red', fontSize: productPriceSize}} >{ product.price } {translaste('No price')} </h4> 
                            }
                        </div>
                    </div>  
                        
            </div>
        </Tag>
            
)}

export default ProductCard