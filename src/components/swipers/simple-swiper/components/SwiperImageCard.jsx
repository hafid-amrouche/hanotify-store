import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../../store/store-context'
import LazyImage from '../../../LazyImage'


const SwiperImageCard=({imageObject, sectionDesign})=>{
    const {theme} = useStoreContext()
    const imageDesign =  sectionDesign
    
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
                }}
            >
                <LazyImage 
                    style={{
                        width: '100%', 
                        aspectRatio: aspectRatio, 
                        backgroundSize: objectFit,
                    }} 
                    src={imageObject.url}
                />                        
            </div>
        </Tag>
            
)}

export default SwiperImageCard