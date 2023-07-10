import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    editrole,getOneuser} from '../../../../rudex/slices/user/userSlice';

const Role = () => {
    const params = useParams();

    const dispatch = useDispatch();
  
    const {Newuser,NewuserLoading,NewuserSuccess } = useSelector(
        (state) => state.userSlice
      );
  
    const [userId, setuserId] = useState('');
    const [Role, setRole] = useState('');
    
  
    useEffect(() => {
      dispatch(getOneuser(params?.userId));
      console.log(params.userId)
    }, [params]);
  
    useEffect(() => {
      if (Newuser?.userId) {
        setuserId(Newuser.userId);
        setRole(Newuser.Role);         
      }
    }, [params, NewuserLoading]);
  
    const navigate = useNavigate();
  
    // const success = () => {
    //   if (newProductSuccess === true) {
    //     navigate(`/Dashboard/patients/new/${params.ProductId}`);
    //     dispatch(reset());
    //   }
    // };
  
    // useEffect(() => {
    //   success();
    // }, [newProductSuccess]);
  
    const updateHandler = (e) => {
      e.preventDefault();
  
      if (!userId || !Role ) {
        alert('Please provide the required info.');
        return;
      }
  
      const data = {
        userId:params.userId,
        userId,
        Role
      
        };
  
      dispatch(editrole(data));
    };
  return (
    <div className='header  w-[80%] mt-auto sm:w-[100%]'>
      

    <form onSubmit={updateHandler} className='  border  mx-auto p-7 sm:w-[100%] '>
     <div className='  w-[50%] mx-auto p-9 sm:w-[90%] rounded-[10px] mt-20
     '>
     <div className='text-[24px] ml-7' >
      <h1>Create new post</h1>
    </div>
    <div className='flex gap-[5rem] ml-7'>
    <div className>
        <div >
          <label htmlFor='Name'>userId</label>
        </div>
        <div>
          <input
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
            type='text'
            className='px-2 py-2   outline-none border '
            placeholder=''
            id='Name'
            required
          />
        </div>
      </div>

      <div className>
        <div >
          <label htmlFor='title'>Role</label>
        </div>
        <div>
          <input
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            type='text'
            className='px-2 py-2 rounded-[5px] outline-none border'
            placeholder='063'
            id='Price'
            required
          />
        </div>
      </div>
    

        <button className='bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>
        {NewuserLoading ? (loading) : 'create'}
        </button>
      </div>
     </div>

      
    </form>
  </div>
  )
}

export default Role