import React from 'react'
import Link from 'next/link'

import { contactSocials } from '@/data/contact'

import styles from './contact-social.module.css'



const ContactSocials = () => {
  return (
    <div className={styles.contactInfoSocials}>
            {contactSocials.map((item) => (
                <Link href={item.link} key={item.key} title={item.key} target='_blank' rel='noopener noreferrer'>
                <item.icon height={24} width={24} color='black'/>
                </Link>
            ))}
        </div>
  )
}

export default ContactSocials