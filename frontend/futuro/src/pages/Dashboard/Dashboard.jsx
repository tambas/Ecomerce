import React from 'react'
import Sidebar from '../../pages/Dashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div  className='flex flex-nowrap gap-2  items-start    mx-auto 
     sm:w-[100%] 
     '>

       <div className='lg:w-[27%]    sm:w-[40%]  '>
        
       <Sidebar/>
       </div>
      <div className='b lg:w-[100%]    sm:w-[100%] '>
      <Outlet  />
      
      </div>
       
    </div>
  )
}

export default Dashboard;