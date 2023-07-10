import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getAll,deletesubcatogary } from '../../../../rudex/slices/Subcatogary/Subcatogary'
// import Createcatogary from './Createcatogary';

const Subcatogary = () => {

    const dispatch = useDispatch();
    const { subcatogary,isLoading,isError,isSuccess} = useSelector((state) => state.sub)
    console.log(subcatogary, "FOUND DATA!!!!!!!!!!")
  
    useEffect(() =>{
  
      // invocation ()
  dispatch(getAll())
    },[])
  
    const deleteHandler = (ID) => {
    
      dispatch(deletesubcatogary(ID));
      console.log(subcatogary);
    };
  return (
   <div>
      <div className='head w-full flex items-center justify-between m-2 '>
     <h1 className='text-xl font-bold'>costumer</h1>
    <Link to="/Dashboard/Subcatogary/new">
    <button className='text-xl bg-slate-600 hover:bg-slate-400 text-white font-bold py-1 px-5 rounded mb-4 mr-[8rem]  '>
       Create
     </button>
    </Link>
     </div>
    {isLoading? isLoading:(
        <div>
          <div className='head w-full  items-center justify-between'>
      <h1 className='text-xl font-bold'>Catogart</h1>
      </div>
       
         
    <div className='overflow-y-auto h-[25rem'>
    <div class=" sm: w-[77%] relative  overflow-x-auto shadow-md  sm:rounded-lg  lg:w-[100%]">
     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:w-[100%] ">
       
         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
             <tr>
                 
                 <th scope="col" class="px-6 py-3">
                     Name
                 </th>
                 <th scope="col" class="px-6 py-3">
                     view
                 </th>
                 <th scope="col" class="px-6 py-3">
                     Delete
                 </th>
                 
             </tr>
         </thead>
          {subcatogary?.catagory?.map(( catagory
 ) =>( 
            <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
               
                <th scope="row" class="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
                <td class="px-6 py-4">
                {catagory.type}
                
                </td>  
                </th>  
                <td class="px-6 py-4">
               <Link to={`/Dashboard/Subcatogary/Edit/${catagory.subatCagoryId}`}>
               <button className='px-3 py-2 bg-green-500 text-white'>
               update
                  </button>
                     </Link>
                </td>
               
 
                <td class="px-6 py-4">
                    <button className='px-3 py-2 bg-green-900 text-white'onClick={()=> deleteHandler(catagory.CagoryId)}>
                    delete
                 </button>
                </td>
 
                 
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
               
            </tr>
        </tbody>
        ))}
     </table>
     
    
 </div>
    </div>
 
        </div>
      )}
   </div>
  )
}

export default Subcatogary