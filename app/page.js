import React from 'react'
import Herosection from './components/Herosection'

export default function page() {
  return (
    <div className='bg-slate-100 w-full h-full'>
      <Herosection />
      <div className="how flex flex-col items-center">
        <span className='text-lg font-bold text-teal-400 text-center mt-10'>HOW IT WORKS</span>
        <h1 className='text-4xl font-bold text'>Three steps. That's it.</h1>
        <div className="step flex items-start justify-center gap-10 mb-10">
          <div className="flex flex-col items-center gap-5 mt-10 w-[30vw] relative bg-white p-10 rounded-2xl border border-gray-300 shadow-[0px_0px_10px_4px_#e0e1e1]">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>01</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
            <svg class="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2">
              <path strokeLinecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg></div>
            <span className='text-2xl font-bold text'>Upload Resumes & JD</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Drag and drop your resumes and the job description — PDF, DOCX, or plain text.</p>
          </div>
          <div className="flex flex-col items-center gap-5 mt-10 w-[30vw] relative bg-white p-10 rounded-2xl border border-gray-300">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>02</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
            <svg class="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
            <span className='text-2xl font-bold text'>AI Analyzes & Matches</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Our AI engine extracts skills, compares requirements, and scores each resume instantly.</p>
          </div>
          <div className="flex flex-col items-center gap-5 mt-10 w-[30vw] relative bg-white p-10 rounded-2xl border border-gray-300">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>03</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
            <svg class="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <span className='text-2xl font-bold text'>Get Your Report</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Download a structured PDF report with match scores, skill gaps, and recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
