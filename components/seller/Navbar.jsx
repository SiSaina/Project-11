import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { logout, router } = useAppContext()
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image onClick={() => router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />
      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-600 transition"
        >
          Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar 