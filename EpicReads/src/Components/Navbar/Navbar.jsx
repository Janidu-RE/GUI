import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='container'>
      <img src = {logo} alt= "" className='logo'/>
      
      <ul>
        <li> Home </li>
        <li> Book Categories </li>
        <li> About Us </li>
        <li><button className='button'>Sign Up</button></li>
      </ul>
    
    </nav>
  )
}

export default Navbar
