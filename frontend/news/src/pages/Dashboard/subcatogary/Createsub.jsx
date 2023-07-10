import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { newsubcatogary,reset } from '../../../../rudex/slices/Subcatogary/Subcatogary';

const Createsub = () => {
  const [type, settype] = useState('');
  const [subId, setsubId] = useState('');
  const [img, setimg] = useState('');
  
  const { newsubcatogaryLoading,isSuccess } = useSelector(
      (state) => state.sub
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (isSuccess) {
        navigate('/Dashboard/Subcatogary');
        dispatch(reset());
      }
    }, [isSuccess]);

    

    const handleSubmit = (e) => {
      e.preventDefault();
   const data = {
    type,
    subId,
    img
    
      };
  
      dispatch(newsubcatogary(data));
    };

  return (
    <div className='header  mx-auto sm:w-[90%]'>
      
      
    <form className='p-7 'onSubmit={handleSubmit} >
     <div className=' bg-white  border shadow  p-9 sm:w-[100%] 
     '>
     <div className='text-[19px] mb-5 bg-gray-100 border  p-3' >
      <h1>Create new Catogart</h1>
    </div>
    <div className=' ml-7 m-2'>
    <div className>
        <div >
          <label htmlFor='Name '>type</label>
        </div>
        <div>
          <input
            value={type}
            onChange={(e) => settype(e.target.value)}
            type='text'
            className=' px-2 py-2 rounded-[5px] w-[70%] outline-none border '
            placeholder='inter your type'
            id='Name'
            required
          />
        </div>
        <div/>

        <div >
          <label htmlFor='Name '>subcatogary</label>
        </div>

        <div>
          <input
            value={subId}
            onChange={(e) => setsubId(e.target.value)}
            type='text'
            className=' px-2 py-2 rounded-[5px] w-[70%] outline-none border '
            placeholder=''
            id='Name'
            required
          />
        </div>
        <div/>

        <div >
          <label htmlFor='Name '>img</label>
        </div>

        <div>
          <input
            value={img}
            onChange={(e) => setimg(e.target.value)}
            type='text'
            className=' px-2 py-2 rounded-[5px] w-[70%] outline-none border '
            placeholder=''
            id='Name'
            required
          />
        </div>
        <div/>
      
      </div>

      

    
    </div>  
      <div>
        <button className='bg-green-600 hover:bg-slate-400 text-white font-bold py-3  px-7 rounded mt-3 ml-7'>
            
        {newsubcatogaryLoading ? <p>loading</p> : 'create'}
        </button>
      </div>
     </div>

      
    </form>
  </div>
  )
}

export default Createsub