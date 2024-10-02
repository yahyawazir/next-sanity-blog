'use client'
import React from 'react'
import useScrollThreshold from '@/lib/use-scroll'
import { usePathname } from 'next/navigation';
import useInvalidPaths from '@/lib/use-invalid-paths';
import { Label } from '../ui/label';
import { ThemeToggle } from '../theme-toggle';
import Link from 'next/link';

export default function Header(): React.JSX.Element {
    const scrolled: boolean = useScrollThreshold(30);
    const invalidPath: boolean = useInvalidPaths();

    if (invalidPath) return <></>;

    return (
        <div className={`flex fixed inset-0 flex-col items-center ${scrolled && 'drop-shadow-md'} transition-all duration-300 z-50 h-20 bg-background border-b border-border`}>
            <div className='max-w-[1500px] h-full flex md:px-14 px-4 w-full flex-row items-center justify-between'>
                <Link href='/' sr-only="home page" className='cursor-pointer '><Label className="font-extrabold text-2xl cursor-pointer">My Blog</Label></Link>
                <ThemeToggle />
            </div>
        </div>
    );
};
