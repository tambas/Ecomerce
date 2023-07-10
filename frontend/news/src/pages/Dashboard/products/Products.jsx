import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getAllProducts ,deleteProduct} from '../../../../rudex/slices/product/productSlice'
// import Spinner from '../../components/';

const Products = () => {

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


  return (
    
    
    <div className='w-[100%]   sm:w-[100%] mt-5'>
 
   <div className='head w-full flex items-center justify-between'>
     <h1 className='text-xl font-bold'>costumer</h1>
    <Link to="/Dashboard/patients/new">
    <button className='text-xl bg-slate-600 hover:bg-slate-400 text-white font-bold py-1 px-5 rounded mb-4 mr-[8rem] '>
       Create
     </button>
    </Link>
     </div>
     {isLoading? isLoading:(
       <>
         
      
        
   <div className='overflow-y-auto h-[25rem] '>
   <div class=" sm: w-[77%] relative  overflow-x-auto shadow-md  sm:rounded-lg  lg:w-[100%]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:w-[100%] ">
      
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-6 py-3">
                    ID
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>

                <th scope="col" class="px-6 py-3">
                    image
                </th>

                <th scope="col" class="px-6 py-3">
                Price
                </th>

                <th scope="col" class="px-6 py-3">
                store
                </th>

                <th scope="col" class="px-6 py-3">
                    Category
                </th>
             
                <th scope="col" class="px-6 py-3">
                    view
                </th>
                <th scope="col" class="px-6 py-3">
                    Delete
                </th>
                <th scope="col" class="px-6 py-3">
                    update
                </th>
            </tr>
        </thead>
        {products?.  product?.map(( product
) =>(
           <tbody>

            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' >
                <td className='px-6 py-4'>
                { product.ProductId}
                </td>

                <td>
                { product. title}
                </td>

                <td>
                    <img src={product.img}  alt="" srcset="" />
                    <img src={product.img}  alt="" />
                    {product.img} 
                </td>

                <td className='px-6 py-4'>
                { product.Price}
                </td>

                <td>
                { product. Store}
                </td>

               


            </tr>
           {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
              
               <th scope="row" class="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
               <td class="px-6 py-4">
               { product.ProductId}
               </td>

               <td>
                <img src= {product.img} alt="" />
                
               </td>
                   <div class="pl-3"> title
                       <div class="text-base font-semibold">{ product. title}</div>
                       
                   </div>  
               </th>
               
               <td class="px-6 py-4">
               { product.Price
}
               </td>

               <td class="px-6 py-4">
                   <div class="flex items-center"> store
                       <div class=""></div> { product.Store}
                   </div>
               </td>

              
              <td class="px-6 py-4">
              <Link to={`/Dashboard/patients/get/${product.ProductId}`}>
              <button className='px-0.5 py-2 text-blue-600 '>
                   view
                 </button>
                    </Link>
               </td>
              

               <td class="px-6 py-4">
                   <button className='px-0.5 py-2  text-green-600'onAbort={deleteHandler}>
                   delete
                </button>
               </td>

               <td class="px-6 py-4">
              <Link to={`/Dashboard/patients/Edit/${product.ProductId}`}>
              <button className='px-2 py-1  bg-gray-300 text-gray-700 '>
              update
                 </button>
                    </Link>
               </td>

               
              
           </tr> */}
           {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               
              
           </tr> */}
       </tbody>
        ))}
    </table>
    
   
</div>
   </div>

       </>
     )}
     
     </div>


    
  )
}

export default Products