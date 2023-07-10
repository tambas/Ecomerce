import React from 'react'
// import Post from './Post';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import {getAllProducts } from '../../../rudex/slices/product/productSlice'
import {useDispatch,useSelector} from 'react-redux'

const Posts = () => {
   
    const dispatch = useDispatch();
    const { products,isLoading,isError,isSuccess} = useSelector((state) => state.product)
    console.log(products, "FOUND DATA!!!!!!!!!!")
  
    useEffect(() =>{
  
      // invocation ()
  dispatch(getAllProducts())
    },[])
  
  

  return (
    <div>
     

        <div>
        {products?.  product?.map(( product
) =>(
 <div className=' grid grid-cols-4  '>
   <div className='border-solid border-2 border-gray-200  px-4 py-6   '>
      
      
  <div className='border-solid border-2 border-gray-200  px-4 py-6   '>
       {/* <div> */}
       {product.image ? (
          <div className='w-[100%]' >
            <img src={product.image} alt='' />
          </div>
        ) : (
          ''
        )}

       
       {/* </div> */}
       <h4>{ product. title}</h4>
       <p>${ product.Store}</p>
       <div>
       <Link to={''}>
               <button className='px-2 py-1 rounded  bg-gray-300 text-gray-700 hover:bg-green-300 '>
               Cart
                  </button>
                     </Link>
                     <Link to={''}>
               <button className='px-0.5 py-2 text-blue-600 '>
                    view
                  </button>
                  </Link>
       </div>
  </div>
  </div>

 </div>
  ))}
        </div>


        
    </div>

    
   
  )
}

export default Posts