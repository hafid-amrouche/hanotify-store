import React, { useEffect, memo, useState } from 'react';
import './ImageSlider.css'; // Style file for ImageSlider (you can customize this)
import { useProductContext } from '../pages/product-page/store/product-context';


const ImageSlider = memo(() => {
  const {currentImage, setCurrentImage, productData} = useProductContext()
  const {galleryImages} = productData
  const images = galleryImages.map((image, index)=>({
    url: image,
    id: index
  }))
  const [fullscreen, setFullscreen] = useState(false);
  const nextSlide = () => {
    const index = ((images.findIndex(obj => obj.id === currentImage.id)) + 1 )% images.length;
    setCurrentImage(images[index]);
  };

  const prevSlide = () => {
    let index = ((images.findIndex(obj => obj.id === currentImage.id)) + images.length - 1 )% images.length;
    setCurrentImage(images[index]);
  }

  const toggleFullScreen = ()=>{
    setFullscreen(state=>!state)
  }

  const handleDotClick = (id) => {
    setCurrentImage(images.find(image=>image.id === id));
  };

  useEffect(()=>{
    if (fullscreen) {
      document.getElementById('image-slider__container').classList.remove('p-sticky-md')
      document.documentElement.style.overflow ='hidden'
    }
    else {
      document.getElementById('image-slider__container').classList.add('p-sticky-md')
      document.documentElement.style.removeProperty('overflow')
    }
  }, [fullscreen])


  return (
    <div id="image-slider" className={`image-slider ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="slides" key={currentImage.url}>
          <div
            className={`slide cursor-pointer ${fullscreen ? 'full-screen-image' : ''}`}
            style={{ backgroundImage: `url(${currentImage.url})` }}
            onClick={()=>setFullscreen(true)}
            id='gallery-image-container'
          />
          <button className="prev" onClick={prevSlide}>&#10094;</button>
          <button className="next" onClick={nextSlide}>&#10095;</button>
        <i className={ (fullscreen ? 'fa-solid fa-expand' : 'fa-solid fa-compress') + ' fullscreen-btn' } onClick={toggleFullScreen}></i>
      </div>
      <div className="dots d-flex flex-nowrap overflow-x-auto">
        {images.map((image) => (
          <div key={image.id} className={`${image.id === currentImage.id ? 'active' : ''}`} style={{borderRadius: 'var(--border-radius-1)'}}>
            <span
              className='dot'
              onClick={() => handleDotClick(image.id)}
              style={{
                backgroundImage: `url(${image.url})`
              }}
            />
          </div>
            
        ))}
      </div>
    </div>
  );
})

export default ImageSlider;