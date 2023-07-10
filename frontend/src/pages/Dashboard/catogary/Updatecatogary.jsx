import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {editcatogary,getOnecatogary } from '../../../../rudex/slices/catogary/CatogarySlice'
import Createcatogary from './Createcatogary';

const Updatecatogary = () => {
      const params = useParams();
    const dispatch = useDispatch();
    const { Newcatogary,newcatogaryLoading,newcatogarySuccess} = useSelector((state) => state.catogary)
     const [type, settype] = useState('');

      useEffect(() => {
      dispatch(getOnecatogary(params?.CagoryId));
      console.log(params.CagoryId)
    }, [params]);

      useEffect(() => {
      if (Newcatogary?.CagoryId) {
          settype(Newcatogary.type);
      }
    }, [params, newcatogaryLoading]);

    const navigate = useNavigate();

      const updateHandler = (e) => {
      e.preventDefault();
  
      if (!type ) {
        alert('Please provide the required info.');
        return;
      }
  
      const data = {
        CagoryId:params.CagoryId,
        type,
      
        };
  
      dispatch(editcatogary(data));
    };
  
  return (
    <div className='header mx-auto sm:w-[100%] '>
      
      
    <form  className=' mx-auto p-7 sm:w-[100%] 'onSubmit={updateHandler}>
     <div className=' bg-white w-[100%] border mx-auto p-9 sm:w-[90%] 
     '>
     <div className='text-[24px] ml-7 bg-gray-100 p-3 hover:text-green-600' >
      <h1>Update User </h1>
    </div>
    <div className=' gap-[5rem] ml-7 mt-5'>
    <div className>
        <div >
          <label htmlFor='Name '>type</label>
        </div>
        <div>
          <input
            value={type}
            onChange={(e) => settype(e.target.value)}
            type='text'
            className=' px-2 py-2  w-[90%] outline-none border  '
            placeholder=''
            id='Name'
            required
          />
        </div>
      </div>
</div>
      
    

     
      <div>
        <button className='bg-green-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>update
        {newcatogaryLoading ? <p>loading</p> : 'Update'}
        </button>
      </div>
     </div>

      
    </form>
  </div>
  )
}

export default Updatecatogary