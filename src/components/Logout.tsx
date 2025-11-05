"use client";
import { PowerIcon } from '@heroicons/react/16/solid';

import React from 'react'
import { useUser } from '@/context/UserContext'


const Logout = () => {
    const user = useUser();
    const handleClick = () => {
        user?.actions.logout();

    }
    return (
        <button className='flex items-center gap-2 cursor-pointer  text-gray-700 hover:text-blue-500' onClick={handleClick}><PowerIcon className='w-5 h-5' /><span className="">Sign out</span></button>
    )
}

export default Logout