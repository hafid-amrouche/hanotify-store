import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {filesUrl} from '../constants/Urls'
import states from '../json/states.json'
import BuySection from './product-page/BuySection'
import BuyButton from '../components/BuyButton'
import { adjustScrollPosition, translaste } from '../utils/utils'

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
    variantsCombinations: [],
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
            
            const data = await response.json()
            let shippingCostByState = data.shippingCostByState
            shippingCostByState = shippingCostByState.length > 0 ? shippingCostByState.map(cost=>{
              const state = states.find(state=>state.id === cost.id)
              return({
                  ...cost,
                  cost: cost.cost,
                  costToHome: cost.costToHome,
                  label: `${state.code} - ${state.name}`,
              })
            }): states.map(state=>({
              cost: 0,
              costToHome: 0,
              label: `${state.code} - ${state.name}`,
              id :state.id
            }))
            setProductData(productData=>({
                ...productData,
                ...data,
                shippingCostByState: shippingCostByState,
            }))
          }
          catch(error){
            console.log(error)
          }              
        }
        fetchProduct()
    }, [])
    useEffect(() => {
        // Dynamically import CSS based on the theme
        const loadRichTextCss = async () => {
          if (productData?.richText) {
            await import('./product-page/suneditor-contents.css');
          }
        };
    
        loadRichTextCss();
      }, [productData]);
  return (
    <div style={{maxWidth: '40rem', margin: 'auto', position:'relative'}}>
        <Link to='/products/very-sexy-boy/1010'>qdjjdpoqjojjdoqsjo</Link>
        {productData.richText  && <div className='p-1 sun-editor-editable' style={{margin: '8px auto 0 auto'}} dangerouslySetInnerHTML={{ __html: productData.richText }} />}
        { productData.productId && <div className='p-2' id='buy-section' style={{position: 'absolute', zIndex: 2, backgroundColor: 'var(--background-color)', width: '100%', paddingBottom: 'calc(40vh - 186px)'}}>
            <BuySection productData={productData} />
        </div>}
        <div className='p-2' style={{position: 'fixed', bottom: 0, width: '100%', maxWidth: '40rem'}}>
            <BuyButton onClick={()=>adjustScrollPosition(document.querySelector('#buy-section'))} className='gap-2 jiggle' style={{width: '90%', margin: 'auto'}}>
                <i className="fa-solid fa-cart-shopping" />
                { translaste('Order now') }
            </BuyButton>
        </div>
    </div>
  )
}

export default LandingPage