// import React, { useState } from "react"
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import style from './Header.css'
import { Link } from 'react-router-dom'
// import {User} from "../Header/User"
import { logout } from '../../../rudex/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
// ============================
const {user} = useSelector((state) => state.auth);

const [showbtn, setshowbtn] = useState(false);

const [admin, setadmin] = useState(false);

// const [openprofile, setopenprofile] = useState (false)
 

const dispatch = useDispatch();

const logoutHandler = () => {
  dispatch(logout());
};
useEffect(() => {
  if (user?.user?.role === "USER") {
	setadmin(false);
	return;
  }
  {
    if (user?.token) {
      setshowbtn(false);
      return;
      }
  }
    setadmin(true);

}, [user]);

useEffect(() => {
  if (user?.token) {
	setshowbtn(false);
	return;
  }
  setshowbtn(true);
}, [user
]);



const [nav, setnav] = useState(false);
const handleNav = () => setnav(!nav);
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span class='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>
       

          <div className='navlink'>
          
            {showbtn?(<>
              <ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>


              
<li>
  <Link to='/'>home</Link>
</li>
<li>
  <Link to='/pages'>pages</Link>
</li>
<li>
  <Link to='/user'>user account</Link>
</li>
<li>
  <Link to='/vendor'>vendor account</Link>
</li>
<li>
<button>
					<Link to='/Login'>login</Link>
					</button>
</li>
<li>
  <Link to='/contact'>contact</Link>
</li>
</ul>
            </>):
            <>
             <ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>


              
<li>
  <Link to='/'>home</Link>
</li>
<li>
  <Link to='/pages'>pages</Link>
</li>
<li>
  <Link to='/user'>user account</Link>
</li>
<li>
  <Link to='/vendor'>vendor account</Link>
</li>
<li>
<button>
					<Link to='/Login'>login</Link>
					</button>
</li>
<li>
  <Link to='/contact'>contact</Link>
</li>
<li>
           <button onClick={logoutHandler}>
				
				logout
				
				</button>
           </li>
</ul>
         
        <>
        {admin? (

<Link to='/Dashboard'>
<button>
<a href="/#">Dashboard</a>
</button>
</Link>

):("") }
        </>
            </>
            
            }
            
        

            {/* <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button> */}
            
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
