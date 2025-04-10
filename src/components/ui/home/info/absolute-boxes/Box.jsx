import React from 'react'
import Image from 'next/image'

import { getI18n } from '@/locales/server'

import styles from './box.module.css'

const Box = async ({iconSrc,title,detail}) => {
    const t = await getI18n()
  return (
    <div className={styles.infoRightBoxes}>
        <Image src={iconSrc} height={48} width={48} alt={t(title)} loading='lazy'/>
        <div className={styles.infoRightBoxesDetails}>
            <div className={styles.infoRightBoxesDetailsTitle}>{t(title)}</div>
            <p className={styles.infoRightBoxesDetailsDetail}>{detail}</p>
        </div>
    </div>
  )
}

export default Box