import React, { useContext, useEffect, useRef, useState } from 'react'
import { createContext } from "react";
import { filesUrl } from '../../../constants/Urls';
import {Outlet, useNavigate, useParams} from 'react-router-dom'
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


const ProductContextProviderInner=()=>{
    const [productData, setProductData] = useState(defaultProductData)
    const [error, setError] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
    const {id: productId} = useParams()

    const {language} = useStoreContext()
    const lang_prefix = language === 'ar' ? '_ar': '' 

    const {storeData} = useStoreContext()
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


          let shippingCostByState = data.useDefaultShipping ? storeData.defaultShippigCosts : data.shippingCostByState
          shippingCostByState = shippingCostByState.map(cost=>{
            const state = states.find(state=>state.id === cost.id)
            return({
                ...cost,
                cost: cost.cost,
                costToHome: cost.costToHome,
                label: `${state.code} - ${state['name' + lang_prefix]}`,
            })
          })
          
          data.galleryImages = [...(data.galleryImages || []), ...(data.pricesAndImagesList?.map(row=>row.image).filter(img=>!!img) || [])]
          setProductData(productData=>({
              ...productData,
              ...data,
              shippingCostByState: shippingCostByState,
          }))
          if(data.galleryImages?.length > 0) setCurrentImage({
            id:0,
            url:data.galleryImages[0]
          })
          // SEO
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
      return ()=>{window.productData = undefined}
    }, [])
    
    
    useEffect(() => {
      // Dynamically import CSS based on the theme
      const loadRichTextCss = async () => {
        if (productData?.richText) {
          await import('../../../css/suneditor-contents.css');
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

    const navigate = useNavigate()


    const swiperRef = useRef()
    
    const defaultValue = {
      productData,
      setProductData,
      currentImage,
      setCurrentImage: setCurrentImageWithImagesCount,
      swiperRef
    }

    useEffect(()=>{
      if (productData.combinationIndex >= 0){
        const image =  productData.pricesAndImagesList[productData.combinationIndex]?.image
        if (image) {
          const imageIndex = productData.galleryImages.indexOf(image)
          if (imageIndex >= 0)  swiperRef.current?.swiper.slideTo(imageIndex)
          swiperRef.current?.swiper.slideTo(imageIndex)
        }
      }
    }, [productData.combinationIndex])
    return (
      <ProductContext.Provider value={defaultValue}>
          { productData.productId && <Outlet/>}
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

const ProductContextProvider=()=>{
  const {id: productId} = useParams()
  return <ProductContextProviderInner key={productId} />
}

export default ProductContextProvider
export const useProductContext =()=> useContext(ProductContext)