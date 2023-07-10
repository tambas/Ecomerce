import React from 'react'
import './index.css'
// import Footer from './Components/Footer/Footer'
// import Header from './Components/Headers/Header'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Pages from './pages/Home/Pages'

import Dashboard from './pages/Dashboard/Dashboard'
// import Users from './pages/Dashboard/Users'
// import Catogary from './pages/Dashboard/Catogary'
// import SubCatogary from './pages/Dashboard/SubCatogary'
// import AddProducts from './pages/Dashboard/AddProducts'
// import Sidebar from './pages/Dashboard/Sidebar'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Products from './pages/Dashboard/products/Products'
import Createproduct from './pages/Dashboard/products/Createproduct'
import GetOneproduct from './pages/Dashboard/products/GetOneproduct'
import Updateproduct from './pages/Dashboard/products/updateproduct'
import User from './pages/Dashboard/user/User'
import Createuser from './pages/Dashboard/user/Createuser'
import Updateuser from './pages/Dashboard/user/Updateuser'
import Role from './pages/Dashboard/user/Role'
import Catogary from './pages/Dashboard/catogary/Catogary'
import Createcatogary from './pages/Dashboard/catogary/Createcatogary'
import Getone from './pages/Dashboard/catogary/Getone'
import Updatecatogary from './pages/Dashboard/catogary/Updatecatogary'
import Subcatogary from './pages/Dashboard/subcatogary/Subcatogary'
import Createsub from './pages/Dashboard/subcatogary/Createsub'
import Getonesub from './pages/Dashboard/subcatogary/Getonesub'
import Updatesub from './pages/Dashboard/subcatogary/Updatesub'
// import Search from './Components/swiper/Search'
import Header from './common/Header/Header'
import Footer from './common/footer/Footer'

function App() {
  
  return (
    <div>
     <Router>
      {/* <Search/> */}
     <Header/>
     <Routes>
      <Route path= '/' element={<Pages/>} />
      <Route path= '/Login' element={<Login/>} />
      <Route path= '/Register' element={<Register/>} />
      <Route path='/Dashboard' element={<Dashboard />}>
      <Route path='Catogary' element={<Catogary />} /> 
      <Route path='Catogary/new' element={<Createcatogary />} />
      <Route path='Catogary/get/:CagoryId' element={<Getone />} />
      <Route path='Catogary/Edit/:CagoryId' element={<Updatecatogary />} /> 
      {/* ========= */}
      <Route path='Subcatogary' element={<Subcatogary />} /> 
      <Route path='Subcatogary/new' element={<Createsub />} />
      <Route path='Subcatogary/get/:subatCagoryId' element={<Getonesub />} />
      <Route path='Subcatogary/Edit/:subatCagoryId' element={<Updatesub />} />
      {/* ============ */}
      <Route path='User' element={<User />} />
      <Route path='User/new' element={<Createuser />} />
      <Route path='User/Edit/:userId' element={<Updateuser />} />
      <Route path='User/role/:userId' element={<Role />} />
            <Route path='Products' element={<Products />}></Route>
            <Route path='patients/new' element={<Createproduct />} />
            <Route path='patients/get/:ProductId' element={<GetOneproduct />} />
            <Route path='patients/Edit/:ProductId' element={<Updateproduct />} />
          </Route>
       
     </Routes>
      <Footer/>

     </Router>
    
  
    </div>
  )
}

export default App