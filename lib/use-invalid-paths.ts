'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
export default function useInvalidPaths() {
    const pathName = usePathname();

    const invalidPaths: string[] = ['studio'];

    const isInvalid = invalidPaths.some((path) => pathName.includes(path));

    return isInvalid;
}