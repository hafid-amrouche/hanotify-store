import React, { useEffect, memo, useRef, useState, forwardRef } from 'react';
import './ImageSlider.css'; // Style file for ImageSlider (you can customize this)
import { useProductContext } from '../pages/product-page/store/product-context';
import { useStoreContext } from '../store/store-context';
import useGoBackOnePAth from '../hooks/useGoBackOnePath'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Pagination } from 'swiper/modules';
import 'swiper/css/zoom';
import "swiper/css";
import 'swiper/css/pagination';
import LazyImage from './LazyImage';

function centerActiveChild(parent, activeChild) {
  if (activeChild) {
    // Get the active child's position relative to the parent
    const activeChildOffsetLeft = activeChild.offsetLeft;
    const activeChildWidth = activeChild.offsetWidth;
    
    // Get the width of the parent
    const parentWidth = parent.offsetWidth;
    
    // Calculate how much to scroll to center the active child
    const scrollPosition = activeChildOffsetLeft - (parentWidth / 2) + (activeChildWidth / 2);
    
    // Smoothly scroll the parent to the calculated position
    parent.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
}

// Call the function whenever you need to center the active child
centerActiveChild();


const ImageSliderInner= forwardRef(({fullscreen}, swiperRef)=>{

  const {currentImage, setCurrentImage, productData} = useProductContext()
  const {screenWidth} = useStoreContext()
  
  const {galleryImages} = productData
  const images = galleryImages.map((image, index)=>({
    url: image,
    id: index
  }))

  const slideToIndex=(newIndex)=>{
    swiperRef.current.swiper.slideTo(newIndex)
  }
  const nextSlide = () => {
    const imageIndex = images.findIndex(obj => obj.id === currentImage.id)
    const newIndex = imageIndex <= images.length -2 ? imageIndex + 1 : imageIndex   
    setCurrentImage(images[newIndex]);
    slideToIndex(newIndex)
  };

  const prevSlide = () => {
    const imageIndex = images.findIndex(obj => obj.id === currentImage.id)
    const newIndex = imageIndex >= 1 ? imageIndex - 1 : 0
    setCurrentImage(images[newIndex]);
    slideToIndex(newIndex)
  }

  const goBackOnePath = useGoBackOnePAth()
  const navigate = useNavigate()
  
  const toggleFullScreen = ()=>{
    if (fullscreen) goBackOnePath()
    else navigate('gallery')
  }

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

  const handleSlideChange = (swiper) => {
    setCurrentImage(images.find(image=>image.id === swiper.activeIndex)) // swiper.activeIndex gives the current slide index
  };

  
  return (
    <>
      <div style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0}}>
        <Swiper
          className="mySwiper"
          onClick={()=>!fullscreen && toggleFullScreen()}
          onSlideChange={handleSlideChange}
          ref={swiperRef}
          initialSlide={currentImage.id}
          modules={[Zoom, Pagination]}
          pagination={{
            clickable: true,
          }}
          style={{ 
            height: '100%',
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'absolute',
            top: 0,
            left:0,
            '--swiper-pagination-color': 'var(--primaryColor)',
          }}
          zoom
          grabCursor
        >
          {images.map((image, index)=>(
            <SwiperSlide 
              key={index}
              className={`${fullscreen ? 'full-screen-image' : ''} flex-shrink-0`}
              >
              <div className="swiper-zoom-container">
                <LazyImage
                  loading='lazy'
                  className={` ${screenWidth >= 768 && !fullscreen && 'border' }`}
                  style={{ 
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    objectFit: fullscreen ? 'contain' : 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                    position: 'absolute', 
                    top: 0,
                    left: 0
                  }}
                  src={image.url}
                  diam={200}
                />
              </div>
            </SwiperSlide>
          ))}
        
        </Swiper> 
      </div>
      <button  style={{top: 'calc( 50% - 15px )'}} className={rtl ? ' next' : 'prev' } onClick={prevSlide}>&#10094;</button>
      <button  style={{top: 'calc( 50% - 15px )'}} className={rtl ? ' prev' : 'next'}  onClick={nextSlide}>&#10095;</button>
      <i className={ (fullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand') + ' fullscreen-btn' } onClick={toggleFullScreen}></i>          
    </>

  );
})


const ImageSlider = memo(({fullscreen=false}) => {
  const { swiperRef } = useProductContext()
  const {screenWidth} = useStoreContext()
  const containerRef = useRef()
  const [dimentions, setDimensions] = useState({
    width: 0,
    height: 0
  }) 
  const aspectRatio = fullscreen ? window.innerWidth / window.innerHeight : 1
  const calculateDimensions=()=>{
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight - (window.innerWidth >= 768 && !fullscreen ? 4 : 0);
    const containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > aspectRatio) {
      // Container is wider than the desired aspect ratio, fit height
      setDimensions({
        width: containerHeight * aspectRatio,  // Adjust width based on height
        height: containerHeight,  // Use full container height
      });
    } else {
      // Container is taller than the desired aspect ratio, fit width
      setDimensions({
        width: containerWidth,  // Use full container width
        height: containerWidth / aspectRatio,  // Adjust height based on width
      });
    }
  }

  useEffect(() => {
    calculateDimensions()
  }, [screenWidth]);

  const containerHeight = fullscreen ? window.innerHeight : (screenWidth < 768 ? Math.min(document.documentElement.clientWidth, window.innerHeight) : window.innerHeight)
  
  centerActiveChild(document.querySelector('.swiper-pagination'), document.querySelector('.swiper-pagination-bullet.swiper-pagination-bullet-active'))
  return (
    <div style={{height: '100%', width: '100%',  position: fullscreen ? 'absolute' : undefined, top: 0, left: 0, zIndex: fullscreen && 2 }}>
      <div ref={containerRef} style={{position: 'relative', background: fullscreen ? '#000000' : undefined, display: 'flex', alignItems: "center", justifyContent: 'center', height: containerHeight, width: '100%'}}>
          <div style={{...dimentions, aspectRatio, position:'absolute', top: window.innerWidth >= 768 && !fullscreen ? 4 : 0}}>
            <style>{`
              .swiper{
                display: flex !important;
                justify-content: center
              }
              .swiper-pagination{
                width: unset !important;
                overflow-x: hidden;
                flex-wrap: nowrap;
                display: flex;
                left: unset !important;
                max-width: 90%
              }
              .swiper-pagination-bullet{
                flex-shrink: 0
              }
            `}</style>
            <ImageSliderInner fullscreen={fullscreen} ref={swiperRef} />
          </div>
      </div> 
    </div>
  )})
  

export default ImageSlider;













