import React, { memo, useEffect, useState } from 'react'
import ImageOptions from '../../components/ImageOptions'
import TextOptions from '../../components/TextOptions'
import CircleOptions from '../../components/CircleOptions'
import Select from '../../components/tags/Select'
import RadioInputs from '../../components/tags/RadioInputs'
import { capitalizeFirstLetter } from '../../utils/utils'



function calculateIndex(selectedOptions, optionsCount) {
  // Calculate a unique index for the combination of selected options
  let index = 0;
  let multiplier = 1;

  for (let i = selectedOptions.length - 1; i >= 0; i--) {
      index += selectedOptions[i].id * multiplier;
      multiplier *= optionsCount[i];
  }

  return index;
}

const VarinatsSection = memo(({productData, setProductData}) => {
  const variantsList = Object.values(productData.variants)
  const defaultSelectedOptions = []
  const variantsOptionsNumList = []

  variantsList.forEach(variant=>{ 
    const variantFirstOption = variant.options['1']
    defaultSelectedOptions.push({...variantFirstOption, id: 0})
    variantsOptionsNumList.push(Object.keys(variant.options).length)
  })

  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions)
  const optionsChangeHandler=(variantIndex, option)=>{
    setSelectedOptions(selectedOptions=>{
      const newState = [...selectedOptions]
      newState[variantIndex] = option
      return newState
    })
  }
  
  useEffect(()=>{
      const currentCombinationIndex = calculateIndex(selectedOptions, variantsOptionsNumList)
      setProductData(productData=>({
        ...productData,
        price : productData.pricesAndImagesList[currentCombinationIndex].price,
        originalPrice :productData.pricesAndImagesList[currentCombinationIndex].originalPrice,
        combinationIndex: currentCombinationIndex
      }))
    }, [selectedOptions])

  return (
    <>
        <div className='d-flex flex-column gap-1'>
          {variantsList.map((varinat, variantIndex)=>{
            if (varinat.type==='dropdown'){
              return(
                <div className='input-container' key={variantIndex} >
                  <h4>{capitalizeFirstLetter(varinat.name)}</h4>
                  <div className='col-6 px-1 my-2'>
                    <Select keyExtractor={option=>option.id} options={Object.values(varinat.options).map((option, index)=>({...option, id: index}))} setSelectedOption={(option)=>optionsChangeHandler(variantIndex, option)} selectedOption={selectedOptions[variantIndex]} />
                  </div>
                </div>
              )
            }
            else if (varinat.type==='radio-button'){
              const selectedOption = selectedOptions[variantIndex]
              return(
                <div key={variantIndex}>
                  <h4>{capitalizeFirstLetter(varinat.name)}</h4>
                  <div className='m-2 px-1'>
                    <RadioInputs name={capitalizeFirstLetter(varinat.name)} options={Object.values(varinat.options).map((option, index)=>({...option, id: index}))} selectedRadioOption={selectedOption} setSelectedRadioOption={(option)=>optionsChangeHandler(variantIndex, option)} />
                  </div>
                </div>
              )
            }
            else if (varinat.type==='text-button'){
              const selectedOption = selectedOptions[variantIndex]
              return(
                <div key={variantIndex}>
                  <h4>{capitalizeFirstLetter(varinat.name)}</h4>
                  <div className='my-2 px-1'>
                    <TextOptions options={Object.values(varinat.options).map((option, index)=>({...option, id: index}))} setSelectedTextOption={(option)=>optionsChangeHandler(variantIndex, option)} selectedTextOption={selectedOption} />
                  </div>
                </div>
              )
            }
            else if (varinat.type==='colored-square'){
              const selectedOption = selectedOptions[variantIndex]
              return(
                <div key={variantIndex}>
                  <h4>{capitalizeFirstLetter(varinat.name)}: <span className='color-primary'>{selectedOption.label}</span></h4>
                  <div className='my-2 px-1'>
                    <CircleOptions options={Object.values(varinat.options).map((option, index)=>({...option, id: index}))} setSelectedCCOption={(option)=>optionsChangeHandler(variantIndex, option)} selectedCCOption={selectedOption} />
                  </div>
                </div>
              )
            }
            else if (varinat.type==='image-with-text'){
              const selectedOption = selectedOptions[variantIndex]
              return(
                <div key={variantIndex}>
                  <h4>{capitalizeFirstLetter(varinat.name)}: <span className='color-primary'>{selectedOption.label}</span></h4>
                  <div className='my-2 px-1'>
                    <ImageOptions options={Object.values(varinat.options).map((option, index)=>({...option, id: index}))} setSelectedImageOption={(option)=>optionsChangeHandler(variantIndex, option)}  selectedImageOption={selectedOption} />
                  </div>
                </div>
              )
            }
          })}
          </div> 
    </>
  )
})

export default VarinatsSection