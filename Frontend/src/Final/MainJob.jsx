import React from 'react'
import Navbar from '../components/NavbarPage/Navbar'
import Footer from '../components/FooterPage/Footer'
import JobMatcher from '../components/AIMLPages/Matcher'

function MainJob() {
  return (
    <>
      <Navbar/>
      <JobMatcher/>
      <Footer/>
    </>
  )
}

export default MainJob
