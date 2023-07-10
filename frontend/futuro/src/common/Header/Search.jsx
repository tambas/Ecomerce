import React from "react"
// import logo from "../assets/images/logo.svg"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const {user} = useSelector((state) => state.auth);

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width  w-[20%]'>
            <img src="./image/macmiil.png" alt='' />
          </div>

          <div className='search-box f_flex'>

            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            {/* <i className='fa fa-user icon-circle'></i> */}
            <div className="bg-gray-100 rounded-full w-[3rem] h-[3rem] text-[28px] font-bold text-black text-center  ">
				<h1 className="mt-1">{user?.user?.FirstName[0].toUpperCase()}</h1></div>
            <div className='cart'>
              <Link to=''>
                <i className='fa fa-shopping-bag icon-circle'></i>
                {/* <span>{CartItem.length === 0 ? "" : CartItem.length}</span> */}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
