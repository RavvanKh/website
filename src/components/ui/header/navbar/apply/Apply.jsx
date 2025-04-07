'use client'
import React from 'react'

import { useI18n } from '@/locales/client'

import styles from './apply.module.css'

const Apply = () => {
  const t = useI18n()
  return (
    <button className={styles.navbarItemText}>{t("applyNow")}</button>
  )
}

export default Apply