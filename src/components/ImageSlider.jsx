import React, { useEffect, memo, useRef } from 'react';
import './ImageSlider.css'; // Style file for ImageSlider (you can customize this)
import { useProductContext } from '../pages/product-page/store/product-context';
import { useStoreContext } from '../store/store-context';
import LazyLoadCustiom from './LazyLoadCustiom';
import useGoBackOnePAth from '../hooks/useGoBackOnePath'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom  } from 'swiper/modules';
import 'swiper/css/zoom';


import "swiper/css";


const ImageSlider = memo(({fullscreen=false}) => {
  const {currentImage, setCurrentImage, productData} = useProductContext()
  const {screenWidth} = useStoreContext()
  
  const {galleryImages} = productData
  const images = galleryImages.map((image, index)=>({
    url: image,
    id: index
  }))


  const nextSlide = () => {
    const imageIndex = images.findIndex(obj => obj.id === currentImage.id)
    const newIndex = imageIndex <= images.length -2 ? imageIndex + 1 : imageIndex   
    setCurrentImage(images[newIndex]);
    swiperRef.current.swiper.slideTo(newIndex)
  };

  const prevSlide = () => {
    const imageIndex = images.findIndex(obj => obj.id === currentImage.id)
    const newIndex = imageIndex >= 1 ? imageIndex - 1 : 0
    setCurrentImage(images[newIndex]);
    swiperRef.current.swiper.slideTo(newIndex)
  }

  const goBackOnePath = useGoBackOnePAth()
  const navigate = useNavigate()
  const toggleFullScreen = ()=>{
    if (fullscreen) goBackOnePath()
    else navigate('gallery')
  }

  const handleDotClick = (id) => {
    setCurrentImage(images.find(image=>image.id === id));
    swiperRef.current.swiper.slideTo(id)
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

  const { language }= useStoreContext()
  const rtl = language === 'ar' 

  const dotContainerRef = useRef(null);

  useEffect(() => {
    const dotContainer = dotContainerRef.current;
    const targetElement = document.getElementById(`small-image-${currentImage.id}`);

    if (targetElement && dotContainer) {
      const dotContainerWidth = dotContainer.offsetWidth;
      const dotElementWidth = targetElement.offsetWidth;
      const dotElementLeft = targetElement.offsetLeft;

      // Calculate the scroll position to center the element
      const dotScrollPosition = dotElementLeft - (dotContainerWidth / 2) + (dotElementWidth / 2);

      dotContainer.scroll({
        left: dotScrollPosition,
        behavior: 'smooth', // Smooth scroll to the new position
      });
    }

  }, [currentImage]); // Trigger the effect when imageIndex changes

  const handleSlideChange = (swiper) => {
    setCurrentImage(images.find(image=>image.id === swiper.activeIndex)) // swiper.activeIndex gives the current slide index
  };
  const swiperRef = useRef()

  const aspectRatio = 1
  return (
    <div 
      id="image-slider" className={`image-slider ${fullscreen ? 'fullscreen' : ''} ${screenWidth >= 768 && 'border' }` }
    >
        <div
          className={`slides `}
          style={{
            position: 'relative'
          }}
        >
            <div style={{position: 'absolute', top:0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
              <div style={{
                maxWidth:'100%',
                aspectRatio,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <div style={{ width: '100%', aspectRatio, height:''}}>
                  <Swiper
                    className="mySwiper"
                    onClick={()=>!fullscreen && navigate('gallery')}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                    initialSlide={currentImage.id}
                    grabCursor={true}
                    style={{ 
                      height: '100%',
                      width: '100%',
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    modules={[Zoom]}
                    zoom={true}
                  >
                    {images.map((image, index)=>(
                      <SwiperSlide
                        key={index}
                        className={`${fullscreen ? 'full-screen-image' : ''} flex-shrink-0 swiper-zoom-container`}
                        style={{ 
                          backgroundImage: `url(${image.url})` ,
                          height: '100%',
                          width: '100%',
                          backgroundSize: fullscreen ? undefined : 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          flexShrink: 0
                        }}
                      />
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <button className={rtl ? ' next' : 'prev' } onClick={prevSlide}>&#10094;</button>
            <button className={rtl ? ' prev' : 'next'}  onClick={nextSlide}>&#10095;</button>
          <i className={ (fullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand') + ' fullscreen-btn' } onClick={toggleFullScreen}></i>
        </div>
        <div 
          className="dots d-flex flex-nowrap overflow-x-auto"
          ref={dotContainerRef}
        >
          {images.map((image) => (
            <div key={image.id} className={`${image.id === currentImage.id ? 'active' : ''}`} style={{borderRadius: 'var(--border-radius-1)'}} id={`small-image-${image.id}`}>
              <LazyLoadCustiom>
                <span
                  className='dot'
                  onClick={() => handleDotClick(image.id)}
                  style={{
                    backgroundImage: `url(${image.url})`
                  }}
                />
              </LazyLoadCustiom>
            </div>
              
          ))}
        </div>    
    </div>
  );
})

export default ImageSlider;











