import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { filesUrl } from '../../../constants/Urls';
import {useNavigate, useParams} from 'react-router-dom'
import states from '../../../json/states.json'
import { translaste } from '../../../utils/utils';
import BuyButton from '../../../components/BuyButton';
import { useStoreContext } from '../../../store/store-context';

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
const ProductContext = createContext({
    productData: defaultProductData,
    setProductData: ()=>{},
    currentImage: null,
    setCurrentImage: ()=>{},
})


const ProductContextProvider=({children})=>{
    const [productData, setProductData] = useState(defaultProductData)
    const [error, setError] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
    const {id: productId} = useParams()

    const {language} = useStoreContext()
    const lang_prefix = language === 'ar' ? '_ar': '' 
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
                  label: `${state.code} - ${state['name' + lang_prefix]}`,
              })
            }): states.map(state=>({
              cost: 0,
              costToHome: 0,
              label: `${state.code} - ${state['name' + lang_prefix]}}`,
              id :state.id
            }))
            setProductData(productData=>({
                ...productData,
                ...data,
                shippingCostByState: shippingCostByState,
            }))
            if(data.galleryImages?.length>0) setCurrentImage({
              id:0,
              url:data.galleryImages[0]
            })
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
          await import('../suneditor-contents.css');
        }
      };
  
      loadRichTextCss();
    }, [productData]);

    const setCurrentImageWithImagesCount=(func)=>{
      let newState;
      if (typeof func === '' ) {
        newState = func(productData.galleryImages.length)
      }
      else {
        newState = func
      }
      setCurrentImage(func)
    }

    const defaultValue = {
      productData,
      setProductData,
      currentImage,
      setCurrentImage: setCurrentImageWithImagesCount,
    }
    const navigate = useNavigate()
    return (
        <ProductContext.Provider value={defaultValue}>
            { productData.productId && children}
            { error && <div className='flex-1 d-flex flex-column gap-2 align-items-center justify-content-center' style={{minHeight: 500, width: '100%'}} >
              <h2 className='color-red'>{ translaste('Wrong link') }</h2>
              <BuyButton outline className='d-flex gap-3' onClick={()=>navigate('/')}>
                <i className='fa-solid fa-chevron-left'></i>
                {translaste('Go back to store')}
              </BuyButton>
            </div> }
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
export const useProductContext =()=> useContext(ProductContext)