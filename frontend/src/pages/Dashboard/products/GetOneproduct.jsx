import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneproduct } from '../../../../rudex/slices/product/productSlice';
// import Spinner from '../../../components/Spinner';

const GetOneproduct = () => {
    const params = useParams();

  const { Newproduct, newProductLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneproduct(params.ProductId));
  }, []);

  console.log(Newproduct);
  return (
    <div>
   {newProductLoading? <p>Loading...</p>:(
       <>
        
         {/* {Newproduct?. product?.map(( product */}
{/* ) =>(  */}

    <div>
    <h1 className='text-2xl font-bold'>Firstname</h1>
    <p>{Newproduct?.product?.title}</p>
    <h1 className='text-2xl font-bold'>phone</h1>
    <p>{Newproduct?.product?.title}</p>
    <h1 className='text-2xl font-bold'>Address</h1>
    <p>{Newproduct?.product?.Store}</p>
    <h1 className='text-2xl font-bold'>Address</h1>
    <p>{Newproduct?.product?.subatCagoryId}</p>
    <h1 className='text-2xl font-bold'>Registered at</h1>
    
  </div>
          
        {/* ))} */}
    
    
   


       </>
     )}
  </div>

  )
}

export default GetOneproduct


// {newProductLoading ? (
//   <Spinner />
// ) : (
//   <div>
//     <h1 className='text-2xl font-bold'>Firstname</h1>
//     <p>{Newproduct.title}</p>
//     <h1 className='text-2xl font-bold'>phone</h1>
//     <p>{Newproduct.Price}</p>
//     <h1 className='text-2xl font-bold'>Address</h1>
//     <p>{Newproduct.Store}</p>
//     <h1 className='text-2xl font-bold'>Address</h1>
//     <p>{Newproduct.subId}</p>
//     <h1 className='text-2xl font-bold'>Registered at</h1>
//     {/* <p>{moment(patient.joinedAt, 'YYYYMMDD').fromNow()}</p> */}
//   <div/>
// )}