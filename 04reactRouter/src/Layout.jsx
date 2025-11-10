import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>  
        <Header/>
        <Outlet/> {/* it is used as a base */}
        <Footer/>
    </>
  )
}

export default Layout