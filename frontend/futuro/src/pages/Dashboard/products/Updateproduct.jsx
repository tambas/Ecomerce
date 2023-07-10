import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    editProduct,
    getOneproduct,
    reset
  
} from '../../../../rudex/slices/product/productSlice';
const Updateproduct = () => {
    const params = useParams();

  const dispatch = useDispatch();

  const { product, newProductLoading, newProductSuccess } = useSelector(
    (state) => state.product
  );

  const [title, settitle] = useState('');
  const [Price, setPrice] = useState('');
  const [Store, setStore] = useState('');
  const [subId, setsubId] = useState('');
  const [image, setimage] = useState('');

  useEffect(() => {
    dispatch(getOneproduct(params?.ProductId));
    console.log(params.ProductId)
  }, [params]);

  useEffect(() => {
    if (product?.ProductId) {
        settitle(product.title);
        setPrice(product.Price);
        setStore(product.Store);
        setsubId(product.subId);
        setimage(product.image);
    }
  }, [params, newProductLoading]);

  const navigate = useNavigate();

  // const success = () => {
  //   if (newProductSuccess === true) {
  //     navigate(`/Dashboard/patients/new/${params.ProductId}`);
  //     dispatch(reset());
  //   }
  // };

  useEffect(() => {
    success();
  }, [newProductSuccess]);

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !Price || !Store || !subId) {
      alert('Please provide the required info.');
      return;
    }

    const data = {
        ProductId: params.ProductId,
      title,
      Price,
      Store,
      subId

    };

    dispatch(editProduct(data));
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
          <label htmlFor='Name '>title</label>
        </div>
        <div>
          <input
             value={title}
             onChange={(e) => settitle(e.target.value)}
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
          <label htmlFor='title'>Price</label>
        </div>
        <div>
          <input
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
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
          <label htmlFor='Store'>Store</label>
        </div>
        <div>
          <input
              value={Store}
              onChange={(e) => setStore(e.target.value)}
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
          <label htmlFor='body'>subId</label>
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
      </div>

     
      <div>
        <button className='bg-green-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mt-3 ml-7'>
        {newProductLoading ? <p>loading</p> : 'Update'}
        </button>
      </div>
     </div>

      
    </form>
  </div>
    
            
  )
}

export default Updateproduct