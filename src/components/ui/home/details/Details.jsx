import React from 'react'

import Info from '../info/Info'
import SubjectAreas from '../subject-areas/SubjectAreas'

import styles from './details.module.css'



const Details = () => {
  return (
    <section className={styles.details}>
        <Info/>
        <SubjectAreas/>
    </section>
  )
}

export default Details