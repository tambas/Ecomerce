import React from 'react'
import Annocument from '../../Components/annocument/Annocument'
import FlashDeals from '../../Components/flashDeals/FlashDeals'
import Home from '../../Components/MainPage/Home'
import Posts from '../../Components/posts/posts'
// import Categories from '../../Components/swiper/Categories'
// import SlideCard from '../../Components/swiper/SlideCard'
import Wrapper from '../../Components/wrapper/Wrapper'

function Pages() {
  return (
    <div>
          <Home />
          <FlashDeals/>
          <Annocument />
          <Wrapper />
      
    
    </div>
  )
}

export default Pages