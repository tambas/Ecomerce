import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import Hheader from "../../Components/Headers/Hheader"

const Header = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Search CartItem={CartItem} />
      {/* <Navbar /> */}
      <Hheader />
    </>
  )
}

export default Header
