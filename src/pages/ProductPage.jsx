import React from 'react'
import ImageSlider from '../components/ImageSlider'
import VarinatsSection from './product-page/VarinatsSection';
import BuySection from './product-page/BuySection';
import ProductIntro from './product-page/ProductIntro';
import { useProductContext } from './product-page/store/product-context';
import RalatedProductsSection from './product-page/RalatedProductsSection';
import LazyLoadCustiom from '../components/LazyLoadCustiom';
import { translaste } from '../utils/utils';
import useFBViewPageEvent from '../hooks/useFBViewPageEvent';
import { useParams } from 'react-router-dom';
import { useStoreContext } from '../store/store-context';

const VariantsSectionContainer = ()=>{
  const {productData, setProductData} = useProductContext()
  return <VarinatsSection {...{productData, setProductData}} />
}

const ProductPage=()=>{
  const {productData} = useProductContext()
  useFBViewPageEvent()
  const {id: productId} = useParams()

  const {device} = useStoreContext()
  const isMobile = device === 'mobile'

  return(
    <div className='d-md-flex px-md-4 gap-md-3 flex-wrap' style={{minHeight: '100Vh', maxWidth: 1340, width: '100%', margin: 'auto'}}>
      <div className='col-12 col-md-6 px-md-4'>
        <>
          { productData.galleryImages.length > 0 &&  <div style={{ overflow: 'hidden' ,height: '100%'}} className='p-sticky-md d-flex flex-column' id='image-slider__container'>
              <ImageSlider/>
              { isMobile && <hr className='border-color-primary-fiding' />}
            </div> 
          }
        </>
        <>
          {
            productData.galleryImages.length === 0 && <div className='d-flex align-items-center justify-content-center' 
              style={{
                aspectRatio: 1, 
                maxWidth: '100%', 
                margin: 'auto',
              }}
            >
                <h3 style={{color: 'grey'}}>
                  {translaste('No image was provider')}
                </h3>
                
            </div>
          }
        </>  
      </div>
      <div className='col-12 col-md-6 px-2 px-lg-4 d-flex flex-column gap-1 p-1 mt-1 px-md-4'>
        <ProductIntro/>
        {  productData.pricesAndImagesList.length > 0 && <VariantsSectionContainer/> }
        <div className='mt-3'>
        <BuySection productData={productData}/>
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


export default ProductPage