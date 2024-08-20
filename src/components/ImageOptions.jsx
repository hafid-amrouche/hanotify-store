import React from 'react'
import classes from './ImageOptions.module.css'
import { useProductContext } from '../pages/product-page/store/product-context'

const ImageOptions = ({options, setSelectedImageOption, selectedImageOption}) => {
  const {setCurrentImage} = useProductContext()
  const clickHandler=(option)=>{
    setSelectedImageOption(option)
    setCurrentImage((id)=>{
      return ({
        id: id,
        url: option.image
      })
    })
    const element = document.documentElement
  }
  return (
    <div className={classes.container}>
        {options.map(option=>(
            <div className={`${classes['image-container']} ${selectedImageOption.id === option.id ? classes.selected : undefined}`} key={option.id}>
                <img src={option.image} className={classes.image} onClick={clickHandler.bind(this, option)} />
            </div>
        ))}
    </div>
  )
}

export default ImageOptions