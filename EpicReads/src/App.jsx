import React from 'react'
import Navbar from './Components/Navbar/NavigationBar.jsx'
import Hero from './Components/Hero/Hero'
import './App.css'
import Footer from './Components/Footer/footer.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home.jsx'
import Landing from '../src/Pages/Landing.jsx'


const App = () => {
  return (
    <div>
      <div className='back'>
        <Navbar/>
        <div>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/Home' element={<Home/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
      
      
    </div>
  )
}

export default App
