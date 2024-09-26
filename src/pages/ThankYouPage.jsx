import { useLocation, useParams } from "react-router-dom"
import { useStoreContext } from "../store/store-context"
import { useEffect, useState } from "react"
import { translaste, checkHasEnoughTimePassed } from "../utils/utils"
import {useProductContext} from './product-page/store/product-context'
import { filesUrl } from "../constants/Urls"
import LazyLoadCustiom from "../components/LazyLoadCustiom"
import RalatedProductsSection from "./product-page/RalatedProductsSection"

export function getCombinations(variants) {
    const variantOptions = variants.map(variant => Object.values(variant.options));
    if (variantOptions.length === 0) {
      return [];
    }
    function combine(optionsArray) {
      if (optionsArray.length === 0) {
        return [[]];
      }
  
      const result = [];
      const firstOptionSet = optionsArray[0];
      const remainingOptionSets = optionsArray.slice(1);
  
      const remainingCombinations = combine(remainingOptionSets);
  
      for (const option of firstOptionSet) {
        for (const combination of remainingCombinations) {
          result.push([option.label, ...combination]);
        }
      }
      return result;
    }
  
    const combinations = combine(variantOptions);
  
    return combinations.map(combination => {
      const combinedObject = {};
  
      combination.forEach((option, index) => {
        const variantName = variants[index].name;
        combinedObject[variantName] = option;
      });
  
      return combinedObject;
    });
  }

const ThankYouPage=()=>{
    const {id} = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const order = JSON.parse(searchParams.get('order'));


    const productPrice = order.productPrice || 0;
    const quantity = order.quantity;
    const shippingCost = order.shippingCost || 0;
    const totalPrice = order.totalPrice || 0;
    const index = order.index || 0;
    const enoughTimePassed = order.etp
    
    const {productData} = useProductContext()
    
    let variantsCombinations = []
    if (productData.pricesAndImagesList?.length > 0 ){
        const variantsList = Object.values(productData.variants).filter(variant=>Object.keys(variant.options).length > 0)
        const newCombinition = getCombinations(variantsList)
        variantsCombinations = newCombinition
    }
    const combination = variantsCombinations[index]
    const image = productData.galleryImages && ( productData.pricesAndImagesList[index]?.image || productData.galleryImages[0] || '');
    const title = productData.title || '';
    const {storeData, visitor, orders} = useStoreContext()
    const facebookPixelsId = storeData.facebookPixelsId
    useEffect(()=>{
        if(facebookPixelsId.length > 0 && !visitor.isBlocked && enoughTimePassed){
            window.fbq('track', 'Purchase', {
                content_ids: [id], // Unique identifier for the order
                content_type: 'product',
                value: totalPrice, // Total value of the purchase
                currency: 'USD' // Currency of the purchase
            })
        }
    }, [facebookPixelsId])

    const [fecthing, setFetching] = useState(true)
    const [error, setError] = useState(false)

    const [showOrderInfo, setShowOrderInfo] = useState(true) 
    const [message, setMessage] = useState()
    const [showRelatedProducts, setShowRelatedProducts] = useState(true)
    const getThankYouData=async()=>{
        setFetching(true)
        const response = await fetch(filesUrl + '/get-thank-you?domain=' + window.location.host) 
        if (!response.ok){
            setError(true)
            return;
        }
        const data = await response.json()

        setShowOrderInfo(data.showOrderInfo)
        setShowRelatedProducts(data.showRelatedProducts)
        setMessage(data.message)
        setFetching(false)
    }

    useEffect(()=>{
        getThankYouData()
    }, [])

    useEffect(() => {
        // Dynamically import CSS based on the theme
        const loadRichTextCss = async () => {
          if (message) {
            await import('../css/suneditor-contents.css');
          }
        };
        loadRichTextCss();
      }, [message]);
    if (message !== undefined){
        return(
            <div 
                
                style={{
                    width: 'min(95vw , 600px)',
                    padding: 8,
                    backgroundColor: 'var(--background-color)',
                    borderRadius: 'var(--border-radius-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    margin: '20px auto'
                }}
                className="border"
            >
                <h3 className='color-primary text-center'>{ translaste('Your order have been recieved') }</h3>
                {showOrderInfo &&
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex flex-nowrap gap-2 border p-2">
                            <img src={image} width={80} height={80} style={{objectFit: 'cover'}}/>
                            <div className="d-flex flex-column gap-2">
                                <h3 className="color-primary" style={{lineHeight: 1.2}}>{ title }</h3>
                                <div className="d-flex flex-column gap-1">
                                    { combination && Object.entries(combination).map(([key, value])=>(
                                        <div className="d-flex gap-2 py-0 flex-nowrap" key={key}>
                                            <h4 className="lh-12">{ key }</h4>
                                            <h4 className="color-primary lh-12">{ value }</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex gap-1">
                                <h4>{ translaste('Product price') }: <span className="color-primary">{productPrice} {translaste('DA')}</span></h4>
                            </div>
                            <div className="d-flex gap-1">
                                <h4>{ translaste('Quantity') }: <span className="color-primary">{quantity}</span></h4>
                            </div>
                            <div className="d-flex gap-1">
                                <h4>{ translaste('Shipping cost') }: <span className="color-primary">{shippingCost} {translaste('DA')}</span></h4>
                            </div>
                            <div className="d-flex gap-2">
                                <h4>{ translaste('Total price') }:</h4>
                                <h3 className="color-primary">{totalPrice} {translaste('DA')}</h3>
                            </div> 
                        </div>
                            
                    </div>
                }

                {  message &&
                    <div>
                        <hr className="border"/>
                        <div className='p-1 sun-editor-editable' dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                }
                {
                    showRelatedProducts && (
                        <LazyLoadCustiom className='flex-1'>
                            <RalatedProductsSection />
                        </LazyLoadCustiom>
                    )
                }
            </div>
        )
    }
}

export default ThankYouPage