import React, { lazy, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {apiUrl, filesUrl} from '../constants/Urls'
import states from '../json/states.json'
import BuySection from './product-page/BuySection'
import BuyButton from '../components/BuyButton'
import { adjustScrollPosition, translaste } from '../utils/utils'
import '../css/suneditor-contents.css'
import VarinatsSection from './product-page/VarinatsSection'
import useFBViewPageEvent from '../hooks/useFBViewPageEvent'
import useIncrementProductViewCount from './product-page/hooks/useIncrementProductViewCount'


const defaultProductData = {
    productId: null,
    title: '',
    slug: '',
    miniDescription: '',
    galleryImages: [],
    selectedCategories: [],
    price: 0,
    originalPrice: 0,
    discount: '',
    shippingCostByState: [] ,
    variants: {},
    pricesAndImagesList: [],
    combinationIndex: 0,
    richText: '',
    relatedProducts: [],
    allProductsRelated: false,
  }

const LandingPage = () => {
    const [productData, setProductData] = useState(defaultProductData)
    const [error, setError] = useState(false)
    const {id: productId} = useParams()

    useEffect(()=>{
        const fetchProduct=async()=>{
          setError(false)
          try{
            let data;
            if (window.productData){
              data = window.productData
            }
            else{
              const response = await fetch(
                filesUrl + `/get-product?product_id=${productId}`,
                {
                  method: 'get'
                }
              )
              if (!response.ok) {
                console.log(`Error: ${response.status} ${response.statusText}`);
                setError(true)
                return;
              }
              data = await response.json()
            } 
              

            let shippingCostByState = data.shippingCostByState
            shippingCostByState = shippingCostByState.length > 0 ? shippingCostByState.map(cost=>{
              const state = states.find(state=>state.id === cost.id)
              return({
                  ...cost,
                  cost: cost.cost,
                  costToHome: cost.costToHome,
                  label: `${state.code} - ${state.name_ar}`,
              })
            }): states.map(state=>({
              cost: 0,
              costToHome: 0,
              label: `${state.code} - ${state.name_ar}`,
              id :state.id
            }))
            setProductData(productData=>({
                ...productData,
                ...data,
                shippingCostByState: shippingCostByState,
            }))
            document.title = data.title || 'Hanotify'
            document.querySelector('#meta-title').setAttribute('content', data.title || 'Hanotify')

            document.querySelector('#meta-image').setAttribute('content', document.querySelector('#meta-image').getAttribute('content') || (data.galleryImages ? data.galleryImages[0] : ''))

            document.querySelector('#description').setAttribute('content',  data.miniDescription || document.querySelector('#description').getAttribute('content'))
            document.querySelector('#meta-descrition').setAttribute('content', data.miniDescription  || document.querySelector('#meta-descrition').getAttribute('content'))
          }
          catch(error){
            console.log(error)
          }              
        }
        fetchProduct()
    }, [])

  useIncrementProductViewCount(productId)
  useFBViewPageEvent()
  const [order, setOrder] = useState(null)
  return (
      <div style={{position:'relative'}}>
        { productData.productId && 
          <>
            { productData.richText  && <div className='sun-editor-editable' style={{margin: '0 auto', minHeight: '100vh', maxWidth: '40rem'}} dangerouslySetInnerHTML={{ __html: productData.richText}} />}
            <div className='p-2' id='buy-section' style={{position: 'absolute', zIndex: 2, backgroundColor: 'var(--backgroundColor)', width: '100%', paddingBottom: 'calc(40vh - 186px)'}}>
                <div style={{maxWidth: 600, margin: 'auto'}} className={'p-2' + (productData.pricesAndImagesList.length > 0 ? ' border': '')}>
                  {  productData.pricesAndImagesList.length > 0 && <div className='mb-2'>
                    <VarinatsSection {...{productData, setProductData}} />
                  </div> }

                  <BuySection productData={productData} setOrder={setOrder} />
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{position: 'fixed', bottom: 0, width: '100%', left: 0, marginBottom: '2vw'}} >
                <BuyButton onClick={()=>adjustScrollPosition(document.querySelector('#buy-section'))} className='gap-2 jiggle' style={{width: '90%', maxWidth: 400}}>
                    <i className="fa-solid fa-cart-shopping" />
                    { translaste('Order now') }
                </BuyButton>
            </div>
          </>
        }
    </div>
  )
}

export default LandingPage