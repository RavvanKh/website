import React, { memo } from 'react';
import Image from 'next/image';

const Logo = memo(() => (
  <Image
    src="/icons/logo.svg"
    height={50}
    width={50}
    alt="Ingress Academy Logo"
    priority
  />
));

export default Logo