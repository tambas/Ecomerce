import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import {editsubcatogary,getOnesub } from '../../../../rudex/slices/Subcatogary/Subcatogary'

const Updatesub = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {Newsubcatogary, isLoading,isSuccess } = useSelector(
    (state) => state.sub
  );
  const [type, settype] = useState('');
  const [subId, setsubId] = useState('');
  const [img, setimg] = useState('');

    useEffect(() => {
    dispatch(getOnesub(params?.subatCagoryId));
    console.log(params.subatCagoryId)
  }, [params]);

    useEffect(() => {
    if (Newsubcatogary?.subatCagoryId) {
        settype(Newsubcatogary.type);
        // setsubId(Newsubcatogary.subId);
        // setimg(Newsubcatogary.img);
    }
  }, [params, isLoading]);

  const navigate = useNavigate();

    const updateHandler = (e) => {
    e.preventDefault();

    if (!type ) {
      alert('Please provide the required info.');
      return;
    }

    const data = {
      subatCagoryId:params.subatCagoryId,
      type,
    
      };

    dispatch(editsubcatogary(data));
  };
  return (
    <div className='header mx-auto sm:w-[100%] '>
      
    {/* onSubmit={updateHandler} */}
  <form  className=' mx-auto p-7 sm:w-[100%] '>
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
          // value={type}
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
  {/* <div className='ml-7'>
      <div >
        <label htmlFor='title'>subId</label>
      </div>
      <div>
        <input
          value={subId}
          onChange={(e) => setsubId(e.target.value)}
          type='text'
          className=' px-2 py-2 rounded-[5px] w-[90%] outline-none border'
          placeholder='063'
          id='Price'
          required
        />
      </div>
    </div> */}
    <div/>
   {/* <div className='ml-7'>
      <div >
        <label htmlFor='Store'>Email</label>
      </div>
      <div>
        <input
          // value={Email}
          // onChange={(e) => setEmail(e.target.value)}
          type='text'
          className=' px-2 py-2 rounded-[5px] w-[90%] outline-none border'
          placeholder='063'
          id='Price'
          required
        />
      </div>
    </div>

    <div className='ml-7'>
      <div>
        <label htmlFor='body'>Password</label>
      </div>
      <div>
      <input
          // value={Password}
          // onChange={(e) => setPassword(e.target.value)}
          type='text'
          className=' px-2 py-2 rounded-[5px] w-[90%] outline-none border'
          placeholder='063'
          id='Price'
          required
        />
      </div>
    </div> */}

   
    <div>
      <button className='bg-green-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>update
      {/* {NewuserLoading ? (loading) : 'Update'} */}
      </button>
    </div>
   </div>

    
  </form>
</div>
  )
}

export default Updatesub