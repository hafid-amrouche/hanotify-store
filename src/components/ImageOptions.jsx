import React from 'react'
import classes from './ImageOptions.module.css'
import { useProductContext } from '../pages/product-page/store/product-context'
import LazyImage from './LazyImage'

const ImageOptions = ({options, setSelectedImageOption, selectedImageOption}) => {
  const clickHandler=(option)=>{
    setSelectedImageOption(option)    
  }
  return (
    <div className={classes.container}>
        {options.map(option=>(
            <div className={`${classes['image-container']} ${selectedImageOption.id === option.id ? classes.selected : undefined}`} key={option.id}>
                <LazyImage src={option.image} className={classes.image} onClick={clickHandler.bind(this, option)} />
            </div>
        ))}
    </div>
  )
}

export default ImageOptions