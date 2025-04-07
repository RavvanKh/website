import React from 'react'
import Navbar from './navbar/Navbar'
import ContactInfo from './contact-info/ContactInfo'

import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.headerContainer}>
        <ContactInfo/>
        <Navbar/>
        </div>
    </header>
  )
}

export default Header