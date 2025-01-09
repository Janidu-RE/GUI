import React from 'react'
import Navbar from './Components/Navbar/NavigationBar.jsx'
import Hero from './Components/Hero/Hero'
import './App.css'
import Footer from './Components/Footer/footer.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <div>
      <div className='back'>
        <Navbar/>
        <Hero/>
        <Footer/>
      </div>
      
      
    </div>
  )
}

export default App
