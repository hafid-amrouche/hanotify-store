import React, { useEffect, useState } from 'react'
import { apiUrl } from '../constants/Urls'
import {translaste} from '../utils/utils'
import ProductCard from '../components/ProductCard'

const host = window.location.host
const HomePage = () => {
  const [orders, setOrders]=useState({
    'latest-products': 2,
    'catgories-products': 3,
    'selected-products': 1
  })
  const [latestProducts, setLatestProducts] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [categoriesProducts, setCategoriesProducts] = useState(null)

  useEffect(()=>{
    fetch(
      apiUrl + '/product/home-products?domain='+host,
    ).then((response)=>{
      response.json().then(data=>{
        data.latestProducts.length > 0 && setLatestProducts(data.latestProducts)
        data.selectedProducts.length > 0 && setSelectedProducts(data.selectedProducts)
        data.categoriesProducts.length > 0 && setCategoriesProducts(data.categoriesProducts)
        setOrders(data.orders)
      })
    })
  }, [])

  return (
    <div className='mt-3 d-flex flex-column gap-4 px-3'>
      {selectedProducts && 
        <div style={{order: orders['selected-products']}}>
            <div className='d-flex gap-2 mb-2 align-items-center color-primary'>
              <i className='fa-solid fa-star' style={{fontSize: 22}}/>
              <h3>{ translaste('Top picks') }</h3>
            </div>
            <div className='d-flex gap-2'>
              {selectedProducts.map(product=><ProductCard key={product.product_id} product={product} />)}
            </div>
            <div className='mt-3'/>
        </div>
      }
      {latestProducts && 
        <div style={{order: orders['latest-products']}}>
            <div className='d-flex gap-2 mb-2 align-items-center color-primary'>
              <i className='fa-solid fa-person-running' style={{fontSize: 26}}/>
              <h3>{ translaste('Latest') }</h3>
            </div>
            <div className='d-flex gap-2'>
              {latestProducts.map(product=><ProductCard key={product.product_id} product={product} />)}
            </div>
            <div className='mt-3'/>
        </div>
      }
      { categoriesProducts && 
        <div style={{order: orders['catgories-products']}} className='d-flex flex-column gap-3'>
          { 
            categoriesProducts.map(category=>(
              <div key={category.name}>
                <div className='d-flex gap-2 mb-2 align-items-center color-primary'>
                  { category.image && <img src={category.image} width={25} height={25} style={{objectFit: 'cover'}} />}
                  { !category.image && <i className='fa-solid fa-layer-group' style={{fontSize: 24}}/> }
                  <h3>{ category.name }</h3>
                </div>
                <div className='d-flex gap-2'>
                  {category.products.map(product=><ProductCard key={product.product_id} product={product} />)}
                </div>
              </div>
            )) 
          }
          <div />
        </div>          
      }
      <div style={{order: 100}}></div>
    </div>
  )
}

export default HomePage