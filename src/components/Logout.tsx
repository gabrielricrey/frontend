"use client";

import React from 'react'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation';

const Logout = () => {
    const user = useUser();
    const router = useRouter();


    const handleClick = () => {
        user?.actions.logout();
        router.push('/')
    }
    return (
        <button className='border' onClick={handleClick}>Log out</button>
    )
}

export default Logout