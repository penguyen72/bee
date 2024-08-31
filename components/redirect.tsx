'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.push('/');
    }, 20000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return null;
}
