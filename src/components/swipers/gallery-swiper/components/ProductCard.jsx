import React from 'react'
import { translaste } from '../../../../utils/utils'
import { useStoreContext } from '../../../../store/store-context'
import { Link } from 'react-router-dom'

const ProductCard=({product, sectionDesign})=>{
    const {theme, device} = useStoreContext()
    const isMobile = device === 'mobile'
    const productsDesign =  sectionDesign.products
    
    const {
        bordersRounded,
        borderColor: borderColorObject,
        backgroundColor: backgroundColorObject,
        borderWidth,
        product: {
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

    const backgroundColor = backgroundColorObject[theme]
    const borderColor = borderColorObject[theme]
    const titleColor = titleColorObject[theme]
    const priceColor = priceColorObject[theme]
    const borderRadius = isMobile ? 4 : 8

    return(
        <Link to={`/products/${product.slug}/${product.product_id}`} 
        // className='scale-on-hover' 
        >
            <div  
                style={{ 
                    overflow: 'hidden', 
                    borderRadius: bordersRounded ? borderRadius : undefined, 
                    boxShadow: '0 5px 20px var(--textFadingColor)',
                    border: `${borderWidth}px solid ${borderColor}`,
                }}>
                    <div
                        style={{
                            backgroundColor: backgroundColor,
                        }}
                    >
                        <div 
                            style={{
                                width: '100%', 
                                aspectRatio: aspectRatio, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent:'center',
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: objectFit,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }} 
                        />
                        <div className='px-2'>
                            <h4 className='cut-text' style={{fontSize: productTitleSize, color: titleColor}}>{ product.title }</h4>
                            {  product.price ? 
                                <div className='d-flex justify-content-between'>
                                    <h4 style={{color: priceColor, fontSize: productPriceSize}}>{ product.price } {translaste('DA')} </h4>
                                    { product.original_price && <h4 style={{color: 'var(---greyColor)', textDecoration: 'line-through', fontSize: productPriceSize}}>{ product.original_price } {translaste('DA')} </h4>}
                                </div>:
                                <h4 style={{color: 'red', fontSize: productPriceSize}} >{ product.price } {translaste('No price')} </h4> 
                            }
                        </div>
                    </div>
            </div>
        </Link>
            
)}


export default ProductCard