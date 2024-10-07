import React from 'react'
import { useStoreContext } from '../../../../store/store-context'
import { Link } from 'react-router-dom'

const SwiperImageCard=({imageObject, sectionDesign: imageDesign})=>{
    const {theme} = useStoreContext()
    
    const {
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
        <Tag to={imageObject.link || undefined}>
            <div  
                style={{ 
                    overflow: 'hidden', 
                    borderRadius: borderRadius, 
                    border: `${borderWidth}px solid ${borderColor}`,
                }}>
                    
                    <div 
                        style={{
                            width: '100%', 
                            aspectRatio: aspectRatio, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent:'center',
                            backgroundImage: `url(${imageObject.url})`,
                            backgroundSize: objectFit,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }} 
                    />
            </div>
        </Tag>
            
)}


export default SwiperImageCard