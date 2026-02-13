import React from 'react'

const Herosection = () => {
  return (
    <div className='bg-[#214186] w-full h-full mt-15 flex flex-col items-center p-10'>
      
      <div className="rounded-full py-2 px-4 border border-[#26dfc6] bg-[#16685d]/30 text-sm font-semibold text-[#26dfc6] w-fit">AI-Powered Resume Analysis</div>
        <span className='text-[4rem] text-white font-bold'>Match Resumes to Job</span>
        <span className='text-[4rem] -my-7 text-white font-bold'>Descriptions with <span className='text-[#12e2c6]'>AI</span></span>
        <span className='text-[4rem] font-bold text-[#15b6a0]'>Precision</span>
        <p className='text-lg mx-4 font-semibold text-center w-150 text-wrap text-slate-400'>Stop wasting hours on manual screening. Get instant skill matching, resume scores, and structured reports — all in one click.</p>
        <div className="flex items-center gap-5">
          <button className='bg-gradient-to-r from-teal-500 to-emerald-400 via-cyan-300 cursor-pointer text-[#214186] font-bold py-3 px-6 rounded-lg mt-5 hover:bg-[#12e2c6] transition duration-300'>Get Started</button>
          <button className='border border-white cursor-pointer text-white font-bold py-3 px-6 rounded-lg mt-5 hover:bg-slate-200/. transition duration-300'>See How It Works</button>

        </div>
    </div>
  )
}

export default Herosection
