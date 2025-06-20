import Image from 'next/image'
import Link from 'next/link'

import { generateLink } from '@/lib/utils/helpers'

import styles from './contact-phone.module.css'


const ContactPhone = ({phone}) => {
  return (
    <Link href={generateLink('phone', phone)} className={styles.contactPhone}>
        <Image loading='lazy' src='/icons/contact-phone.svg' height={24} width={24} alt='Phone' />
    </Link>
  )
}

export default ContactPhone