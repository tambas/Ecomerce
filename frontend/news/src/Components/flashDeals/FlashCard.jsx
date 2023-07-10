import React,{ useState } from 'react'
// import Post from './Post';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import {getAllProducts } from '../../../rudex/slices/product/productSlice'
import {useDispatch,useSelector} from 'react-redux'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SampleNextArrow = (props) => {


  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}
const FlashCard = ({  addToCart }) => {

  const dispatch = useDispatch();
  const { products,isLoading,isError,isSuccess} = useSelector((state) => state.product)
  console.log(products, "FOUND DATA!!!!!!!!!!")

  useEffect(() =>{

    // invocation ()
dispatch(getAllProducts())
  },[])

  const deleteHandler = () => {
    
    dispatch(deleteProduct(products.ProductId));
    console.log(products);
  };

  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <>
      <Slider {...settings}>
        {products?.  product?.map((product) => {
          return (
            <div className='box'>
              <div className='product mtop'>
                <div className='img'>
                  {/* <span className='discount'>{productItems.discount}% Off</span> */}
                  <img src={product.img} alt='' />
                  {/* <div>{product.img}</div> */}
                  <div className='product-like'>
                    <label>{count}</label> <br /> 
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{product.title}</h3>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className='price'>
                    <h4>${product.Price}.00 </h4>
                    {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                    <button onClick={() => addToCart(products)} >
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default FlashCard
