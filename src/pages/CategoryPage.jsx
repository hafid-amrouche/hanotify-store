import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {apiUrl} from '../constants/Urls'
import Shirt from '../components/Shirt'

import { translaste } from '../utils/utils';
import { useStoreContext } from '../store/store-context';
import LazyImage from '../components/LazyImage';

const Card = ({product, style})=>{
  const Tag = product.slug ? Link : 'div'
  return(
    <Tag 
      to={`/products/${product.slug}/${product.product_id}`} 
       style={{
        width: '100%', 
        ...style}} 
       
      // className='scale-on-hover'
      >
      <div  
          style={{ 
              overflow: 'hidden', 
              borderRadius: 'var(--border-radius-1)',
              backgroundColor: 'var(--containerColor)',
          }}>
            { product.image !== null && <LazyImage
                style={{
                    width: '100%', 
                    aspectRatio: 1, 
                    objectFit: 'cover',
                }} 
                src={product.image}
            />}
            {product.image === null && <Shirt aspectRatio={1} fill={'var(--primaryColor)'} />}
            <div className='px-1'>
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
      </Tag>
  )
}


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

  const {screenWidth, device} = useStoreContext()
  const isMobile = device === 'mobile'
  return (
   products && products.length > 0 && (
    <div>
      <h1 style={{textAlign: 'center'}} className='mt-3 color-primary'>{  translaste(title) }</h1>
      <div className='d-flex flex-wrap justify-content-center' style={{marginTop: 24}}>
          {
            products.map(product=>(
              <div key={product.product_id} style={{width: isMobile ? '50%' : '15%'}} className='d-flex'>
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