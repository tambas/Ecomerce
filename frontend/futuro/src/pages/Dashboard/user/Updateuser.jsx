import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    edituser,
    getOneuser,
    
    
  
} from '../../../../rudex/slices/user/userSlice';
import Role from './Role';

const Updateuser = () => {
    const params = useParams();

    const dispatch = useDispatch();
  
    const {Newuser,NewuserLoading,NewuserSuccess } = useSelector(
        (state) => state.userSlice
      );
  
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email,setEmail ] = useState('');
    const [Password, setPassword] = useState('');
    
  
    useEffect(() => {
      dispatch(getOneuser(params?.userId));
      console.log(params.userId)
    }, [params]);
  
    useEffect(() => {
      if (Newuser?.userId) {
          setFirstName(Newuser.FirstName);
          setLastName(Newuser.LastName);
          setEmail(Newuser.Email);
          setPassword(Newuser.Password);
         
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
  
      if (!FirstName || !LastName || !Email || !Password) {
        alert('Please provide the required info.');
        return;
      }
  
      const data = {
        userId:params.userId,
        FirstName,LastName,Email,Password
      
        };
  
      dispatch(edituser(data));
    };
  return (
    <div className='header mx-auto sm:w-[100%] '>
      

    <form onSubmit={updateHandler} className=' mx-auto p-7 sm:w-[100%] '>
     <div className=' bg-white w-[100%] border mx-auto p-9 sm:w-[90%] 
     '>
     <div className='text-[24px] ml-7 bg-gray-100 p-3 hover:text-green-600' >
      <h1>Update User </h1>
    </div>
    <div className=' gap-[5rem] ml-7 mt-5'>
    <div className>
        <div >
          <label htmlFor='Name '>FirstName</label>
        </div>
        <div>
          <input
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            type='text'
            className=' px-2 py-2  w-[90%] outline-none border  '
            placeholder=''
            id='Name'
            required
          />
        </div>
      </div>

      
    </div>
    <div className='ml-7'>
        <div >
          <label htmlFor='title'>LastName</label>
        </div>
        <div>
          <input
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            className=' px-2 py-2 rounded-[5px] w-[90%] outline-none border'
            placeholder='063'
            id='Price'
            required
          />
        </div>
      </div>
      <div/>
     <div className='ml-7'>
        <div >
          <label htmlFor='Store'>Email</label>
        </div>
        <div>
          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            className=' px-2 py-2 rounded-[5px] w-[90%] outline-none border'
            placeholder='063'
            id='Price'
            required
          />
        </div>
      </div>

     
      <div>
        <button className='bg-green-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>
        {NewuserLoading ? (loading) : 'Update'}
        </button>
      </div>
     </div>

      
    </form>
  </div>
  )
}

export default Updateuser