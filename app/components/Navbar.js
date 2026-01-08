import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-300/50 border-b-2 rounded-b-lg shadow-[1px_1px_.2rem_grey] flex justify-between border-gray-900/50 w-full h-12 p-2 items-center'>
      <div className="flex justify-center items-center gap-2">
        <img src="/logo.gif" alt=""  width={30}/>
        <h1 className='text-xl text-shadow-white font-bold'>Resumer – Smart Screening</h1>
      </div>
      <div className="text-sm text-shadow-white font-semibold">
        We are here to help you
      </div>
    </div>
  )
}

export default Navbar
