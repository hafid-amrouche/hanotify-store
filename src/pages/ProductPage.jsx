import React, { useEffect } from 'react'
import ImageSlider from '../components/ImageSlider'
import VarinatsSection from './product-page/VarinatsSection';
import BuySection from './product-page/BuySection';
import ProductIntro from './product-page/ProductIntro';
import ProductContextProvider, { useProductContext } from './product-page/store/product-context';
import RalatedProductsSection from './product-page/RalatedProductsSection';
import LazyLoadCustiom from '../components/LazyLoadCustiom';
import { translaste } from '../utils/utils';
import { apiUrl } from '../constants/Urls';
import { useParams } from 'react-router-dom';

const ProductPageInner=()=>{
  const {productData} = useProductContext()
  return(
    <div className='d-flex '>
        <div className='col-12 col-md-6 p-1'>
          <>
          {/* top: 64, */}
            { productData.galleryImages.length > 0 &&  <div style={{ top: 8, borderRadius: 'var(--border-radius-3)', overflow: 'hidden'}} className='p-sticky-md border' id='image-slider__container'>
                <ImageSlider/>
              </div> 
            }
          </>
          <>
            {
              productData.galleryImages.length === 0 && <div className='d-flex align-items-center justify-content-center' 
                style={{
                  border: `1px solid var(--border-color)`, 
                  aspectRatio: 1, 
                  maxWidth: '100%', 
                  maxHeight: 'calc(100vh - 80px)',
                  margin: 'auto'
                }}
              >
                  <h3 style={{color: 'grey'}}>
                    {translaste('No image was provider')}
                  </h3>
                  
              </div>
            }
          </>  
        </div>
        <div className='col-12 col-md-6 px-2 px-lg-4 d-flex flex-column gap-1 p-1 mt-3'> {/* remove mt-3 */}
          <ProductIntro/>
          {  productData.pricesAndImagesList.length > 0 &&
            <>
              <VarinatsSection />
            </>
          }
          <div className='mt-3'>
          <BuySection productData={productData} />
          </div>
          {productData.richText  && <LazyLoadCustiom className='p-1 my-4 sun-editor-editable' dangerouslySetInnerHTML={{ __html: productData.richText }} />}
        </div>
        <LazyLoadCustiom className='flex-1'>
          <hr className='my-3 border'></hr>
          <RalatedProductsSection />
        </LazyLoadCustiom>
      </div>
  )
}

const ProductPage = () => {
  const {id: productId} = useParams()
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
  return (
    <ProductContextProvider>
      <ProductPageInner/>
    </ProductContextProvider>
  )
}

export default ProductPage