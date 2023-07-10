import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import style from './Header.css'
import { Link } from 'react-router-dom'
// import {User} from "../Header/User"
import { logout } from '../../../rudex/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function Hheader() {
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
		<header className={style. header}>
			 <div className='catgrories d_flex'>
            <span class='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>
			<h3>Macmiil Online</h3>
			<nav ref={navRef}>
			<a href="/#">Home</a>


			 
			  {showbtn ?(
				<>
				<a href="/#">My work</a>
				<a href="/#">Blog</a>
				<a href="/#">About me</a>
				
					<button>
					<Link to='/Login'>login</Link>
					</button>
	
					<button>
					<Link to='/Register'>Register</Link>
					</button>

				
				
				</>
			  ):
			  <>
	<button onClick={logoutHandler}>
				
				logout
				
				</button>
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


				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
			{/* <User  className="Hee"/>  */}
			<div className="bg-green-300 rounded-full w-[3rem] h-[3rem] text-[28px] font-bold text-black text-center ml-[13rem] ">
				<h1 className="ml-3">{user?.user?.FirstName[0].toUpperCase()}</h1></div>
			
			{/* <div className="bg-green-300 rounded-full w-[3rem] h-[3rem] text-[28px] font-bold text-black text-center  ">
				<h1 className="ml-3">{user?.user?.FirstName[0].toUpperCase()}</h1></div> */}
			
		</header>
	);
}

export default Hheader;