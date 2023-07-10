import React from "react"
import FlashCard from "./FlashCard"
import "./style.css"
import {getAllProducts } from '../../../rudex/slices/product/productSlice'
import {useDispatch,useSelector} from 'react-redux'

const FlashDeals = ({ productItems, addToCart }) => {
  const { products,isLoading,isError,isSuccess} = useSelector((state) => state.product)
  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Flash Delas</h1>
          </div>
          <FlashCard products={products} addToCart={addToCart} />
        </div>
      </section>
    </>
  )
}

export default FlashDeals
