import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../../store/store-context'


const SwiperImageCard=({imageObject, sectionDesign})=>{
    const {theme} = useStoreContext()
    const imageDesign =  sectionDesign
    
    const {
        backgroundColor: {
            [theme]: backgroundColor,
        },
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
            width,
        }
    } = imageDesign
    const Tag = imageObject.link ? Link : 'div'
    return(
        <Tag style={{padding: gap/2, width}} to={imageObject.link || undefined}>
            <div  
                style={{ 
                    overflow: 'hidden', 
                    borderRadius: borderRadius, 
                    border: `${borderWidth}px solid ${borderColor}`,
                }}
            >
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