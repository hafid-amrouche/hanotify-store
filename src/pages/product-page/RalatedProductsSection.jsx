import React, { useEffect, useState } from 'react'
import { useProductContext } from './store/product-context'
import ProductCard from '../../components/ProductCard'
import { apiUrl } from '../../constants/Urls'
import Loader from '../../components/Loader'

const RalatedProductsSection = () => {
    const [relatedProducts, setRelatedProducts] = useState(null) 
    const {productData} = useProductContext()
    const [loading, setloading] = useState(true)
    useEffect(()=>{
      const getRelatedProducts=async()=>{
        try{
          const response = await fetch(
            apiUrl + '/product/get-related-products?product_id=' + productData.productId,
            {}
          )
          if (!response.ok) {
            console.log(`Error: ${response.status} ${response.statusText}`);
            setloading(false)
            return;
          }
          setRelatedProducts(await response.json())
          setloading(false)
        }catch(error){
          console.log(error)
          setloading(false)
        }
          
      }
      getRelatedProducts()
    }, [])
  return (
    <div className='d-flex flex-wrap gap-2 p-2 justify-content-center col-12'>
        { !loading && relatedProducts && relatedProducts.map(product=><ProductCard key={product.index} product={product} />)}
        { loading && <Loader diam={160} color='var(--primaryColor)' /> }
    </div>
  )
}

export default RalatedProductsSection