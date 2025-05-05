import React from 'react'

import styles from './course-box.module.css'

const CourseBox = ({item}) => {
  return (
    <div className={styles.courseBoxItem}>{item?.name}</div>
  )
}

export default CourseBox