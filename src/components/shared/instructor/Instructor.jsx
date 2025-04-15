import React from 'react'

import styles from './instructor.module.css'

const Instructor = ({instructor}) => {
  return (
    <div className={styles.instructor}>
        <div className={styles.instructorImgContainer}>
            <img className={styles.instructorImg} src={instructor?.image} alt={instructor?.name} loading='lazy' />
        </div>
        <div className={styles.instructorInfo}>{instructor?.name}</div>
        <div className={styles.instructorRole}>{instructor?.workPlace}</div>
    </div>
  )
}

export default Instructor