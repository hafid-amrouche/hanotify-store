import React, { useEffect, useMemo, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {apiUrl} from '../constants/Urls'

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCreative, Navigation } from 'swiper/modules';

// Import conditionally
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

import { translaste } from '../utils/utils';
import { useStoreContext } from '../store/store-context';

const Card = ({product, style})=>{
  return(
    <Link 
      to={`/products/${product.slug}/${product.product_id}`} 
       style={{
        width: '100%', 
        ...style}} 
       
      // className='scale-on-hover'
      >
      <div  
          style={{ 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px var(--textFadingColor)',
              border: `1px solid var(--primary-fading-color)`,
              backgroundColor: 'var(--containerColor)',
          }}>
            <div 
                style={{
                    width: '100%', 
                    aspectRatio: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent:'center',
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} 
            />
            <div className='px-2'>
                <h4 className='cut-text' >{ product.title }</h4>
                {  product.price ? 
                    <div className='d-flex justify-content-between'>
                        <h4 style={{color: 'var(--primaryColor)'}}>{ product.price } {translaste('DA')} </h4>
                        { product.original_price && <h4 style={{color: 'var(---greyColor)', textDecoration: 'line-through'}}>{ product.original_price } {translaste('DA')} </h4>}
                    </div>:
                    <h4 style={{color: 'red'}} >{ product.price } {translaste('No price')} </h4> 
                }
            </div>
          </div>
      </Link>
  )
}

function createSubArrays(mainArray, n, M) {
    // Helper function to shuffle the array (Fisher-Yates shuffle algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }

  // Shuffle the mainArray
  const shuffledArray = shuffleArray([...mainArray]);

  // Initialize the result array with n empty subarrays
  const result = Array.from({ length: n }, () => []);

  // Distribute the elements
  let index = 0; // Index for tracking position in shuffledArray

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < M; j++) {
      // Push elements into subarray, looping back to the start if needed
      result[i].push(shuffledArray[index % shuffledArray.length]);
      index++;
    }
  }

  return result;
}

const props = [
  {
    pagination: {
        clickable: true,
    },
    grabCursor: true,
    className: "mySwiper2",
    centerInsufficientSlides:  true,

    effect: 'creative',
    creativeEffect: {
      prev: {
        translate: ['-100%', 0, -500],
      },
      next: {
        translate: ['100%', 0, -500],
      },
    },
    style: {
        marginTop: 24,
        width: '50%',
        overflow: 'unset',

    },
    modules: [EffectCreative],
    spaceBetween: 0,
  
  },
  {
    spaceBetween: 8,
    pagination: {
        clickable: true,
    },
    grabCursor: true,
    className: "mySwiper",
    style: {
        marginTop: 24,
        width:'100%',
        overflow: 'unset'
    },
    centerInsufficientSlides:  true,
    modules: [Navigation],    
    navigation: true
  }
]
const CategoryPage = () => {
  const [products, setProducts] = useState(null)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const {slug} = useParams()
  useEffect(()=>{
      setLoading(true)
      fetch(apiUrl + `/category/category-page?domain=${window.location.host}&slug=${slug}`).then(response=>{
        if (!response.ok){
          setLoading(false)
          return
        }
        response.json().then(data=>{
          setProducts(data.products)
          setTitle(data.title)
          setLoading(false)
        })
      }).catch(error=>{
        console.log(error)
        setLoading(false)
      })
  }, [slug])

  const sections = useMemo(()=>products && createSubArrays(products, 4, 4 ), [products])

  const {device, screenWidth} = useStoreContext()
  const isMobile = device==='mobile' 
  return (
   products && products.length > 0 && (
    <div 
        style={{
          overflowX: 'clip',
        }}
      >
        <h1 style={{textAlign: 'center'}} className='mt-3 color-primary'>{  translaste(title) }</h1>
        <Swiper
          {...props[isMobile ?  0 : 1]}
          slidesPerView={ isMobile ? 1 : screenWidth / 220}
          key={[0, isMobile]}
        >
          {
            sections[0].map(product=>(
              <SwiperSlide
                key={product.product_id}
                style={{width: '100%'}}
              >
                <Card product={product}  />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='d-flex flex-wrap justify-content-center' style={{marginTop: 24}}>
          {
            ( isMobile ? sections[1].slice(0, 2): sections[1]).map(product=>(
              <div key={product.product_id} style={{width: isMobile ? '50%' : 220}} className='d-flex'>
                <Card product={product} style={{padding: 2}} />
              </div>
            ))
          }
        </div>
        <Swiper
          {...props[isMobile ?  0 : 1]}
          slidesPerView={ isMobile ? 1 : screenWidth / 220}
          key={[1, isMobile]}
        >
          {
            sections[0].map(product=>(
              <SwiperSlide
                key={product.product_id}
                style={{width: '100%'}}
              >
                <Card product={product} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='d-flex flex-wrap justify-content-center' style={{marginTop: 24}}>
          {
            ( isMobile ? sections[1].slice(2, 4): sections[3]).map(product=>(
              <div key={product.product_id} style={{width: isMobile ? '50%' : 220}} className='d-flex'>
                <Card product={product} style={{padding: 2}} />
              </div>
            ))
          }
        </div>
      </div>
    )
  )
}

export default CategoryPage