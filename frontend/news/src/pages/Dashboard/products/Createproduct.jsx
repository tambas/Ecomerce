import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { newProduct,reset } from '../../../../rudex/slices/product/productSlice';
import { getAllcatogary } from '../../../../rudex/slices/catogary/CatogarySlice';

const Createproduct = () => {
    const [title, settitle] = useState('');
    const [Price, setPrice] = useState('');
    const [Store, setStore] = useState('');
    const [subId, setsubId] = useState('');
    const [img, setimg] = useState('');
    const {newProductLoading,newProductSuccess } = useSelector(
        (state) => state.product
      );

      const { catogary,isLoading,isError,isSuccess} = useSelector((state) => state.catogary)

      const dispatch = useDispatch();
      const navigate = useNavigate();

      
    useEffect(() =>{
  
      // invocation ()
  dispatch(getAllcatogary())
    },[])

      useEffect(() => {
        if (newProductSuccess) {
          navigate("/Dashboard/products");
          dispatch(reset());
        }
      }, [newProductSuccess]);

      

      const handleSubmit = (e) => {
        e.preventDefault();
     const data = {
      title,Price,Store,subId,img
      
        };
    
        dispatch(newProduct(data));
      };
  return (
<>
<div className='header  w-[40%] mx-auto sm:w-[100%]'>
      

      <form onSubmit={handleSubmit} className='    mx-auto p-7 sm:w-[100%] '>
       <div className=' border  mx-auto p-9 sm:w-[90%] 
       '>
       <div className='text-[24px] ml-7 bg-gray-100 p-2' >
        <h1>Create new Product</h1>
      </div>
      <div className='ml-7'>
      <div className>
          <div >
            <label htmlFor='Name'>Product Title</label>
          </div>
          <div>
            <input
              value={title}
              onChange={(e) => settitle(e.target.value)}
              type='text'
              className='px-2 py-2  w-[100%] outline-none border '
              placeholder='Type Here'
              id='Name'
              required
            />
          </div>
        </div>

        <div className>
          <div >
            <label htmlFor='title'>Price</label>
          </div>
          <div>
            <input
              value= {Price}
              onChange={(e) => setPrice(e.target.value)}
              type='number'
              className='px-2 py-2  w-[100%] outline-none border'
              placeholder='Type here price'
              id='Price'
              required
            />
          </div>
        </div>
      </div>

       <div className='ml-7'>
          <div >
            <label htmlFor='Store'>Store</label>
          </div>
          <div>
            <input
              value={Store}
              onChange={(e) => setStore(e.target.value)}
              type='number'
              className='px-2 py-2  w-[100%] outline-none border '
              placeholder='Store'
              id='Store'
              required
            />
          </div>
        </div>

        <div className='ml-7'>
          <div>
            <label htmlFor='body'> Select category</label>
          </div>
          <div>

          <input
              value={subId}
              onChange={(e) => setsubId(e.target.value)}
              type='text'
              className='px-2 py-2  w-[100%] outline-none border '
              placeholder='Store'
              id='Store'
              required
            />

          {/* <select
              value={subId}
              onChange={(e) => setsubId(e.target.value)}
              type='text'
              className='px-2 py-2  w-[100%] outline-none border h-[50%]'
              placeholder='063'
              id='Price'
              required
            >
                       {catogary?.  catagory?.map(( catagory
 ) =>(
  <option
                        className="p-2 "
                        key={catagory.CagoryId}
                        value={catagory.CagoryId}
                      >
                        { catagory.type}
                      </option>
 ))}
            </select> */}
          </div>
        </div>

        <div className='ml-7'>
          <div>
            <label htmlFor='body'>image</label>
          </div>
          <div>
          <input
              value={img}
              onChange={(e) => setimg(e.target.value)}
              type='text'
              className='px-2 py-2  w-[100%] outline-none border'
              placeholder='image'
              id='Price'
              // required
            />
          </div>
        </div>
        

        
           
          
        

       
        <div>
          <button className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>
          {newProductLoading ? (loading) : 'create'}
          </button>
        </div>
       </div>

        
      </form>
    </div>
</>
        

   
  )
}

export default Createproduct
