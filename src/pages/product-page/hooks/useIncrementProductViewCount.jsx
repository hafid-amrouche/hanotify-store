import React, { useEffect } from 'react'
import { apiUrl } from '../../../constants/Urls'

const useIncrementProductViewCount = (productId) => {
    useEffect(()=>{ 
        fetch(
          apiUrl + '/product/increment-product-views',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
              product_id: productId  
            })
          }
        )
      }, [])
}

export default useIncrementProductViewCount