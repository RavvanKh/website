import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { links } from '@/data/contact'

import styles from './contact-phone.module.css'


const ContactPhone = () => {
  return (
    <Link href={links.phone} className={styles.contactPhone}>
        <Image loading='lazy' src='/icons/contact-phone.svg' height={24} width={24} alt='Phone' />
    </Link>
  )
}

export default ContactPhone