import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='Hero'>
      <p className='title'>Discover, Track, and Plan Your <br/>Reading Journey</p>
      <p className='paragraph'>Explore detailed book information and effortlessly manage your reading journey.<br/> Track books you've read, plan your future reads, and discover new favorites—all in one place!</p> 
      <div class="search-container">
        <input type="text" class="search-bar" placeholder="Search a Book"/>
       <button class="search-button">Search</button>
      </div>

    </div>
  )
}

export default Hero

