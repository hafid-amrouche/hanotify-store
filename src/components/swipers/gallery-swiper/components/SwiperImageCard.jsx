import React from 'react'
import { useStoreContext } from '../../../../store/store-context'
import { Link } from 'react-router-dom'
import LazyImage from '../../../LazyImage'

const SwiperImageCard=({imageObject, sectionDesign: imageDesign})=>{
    const {theme} = useStoreContext()
    
    const {
        gap,
        image: {
            border: {
                radius: borderRadius,
                color:  {
                    [theme] : borderColor
                },
                 width: borderWidth,
            },
            aspectRatio,
            objectFit,
        }
    } = imageDesign
    
    const Tag = imageObject.link ? Link : 'div'
    return(
        <Tag style={{padding: gap/2}} to={imageObject.link || undefined}>
            <div  
                style={{ 
                    overflow: 'hidden', 
                    borderRadius: borderRadius, 
                    border: `${borderWidth}px solid ${borderColor}`,
                    display: 'flex'
                }}>
                    
                    <LazyImage
                        style={{
                            width: '100%', 
                            aspectRatio: aspectRatio, 
                            objectFit,
                        }} 
                        src={imageObject.url}
                    />
            </div>
        </Tag>
            
)}


export default SwiperImageCard