import React from 'react'
import Herosection from './components/Herosection'
import Tick from './components/Tick'

export default function page() {
  return (
    <div className='bg-slate-100 w-full h-full'>
      <Herosection />
      <div className="how flex flex-col items-center">
        <span className='text-lg font-bold text-teal-400 text-center mt-10'>HOW IT WORKS</span>
        <h1 className='text-4xl font-bold mt-3'>Three steps. That's it.</h1>
        <div className="step flex items-start justify-center gap-10 mb-10">
          <div className="flex flex-col items-center gap-5  mt-10 w-[22vw] relative bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1] ">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>01</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg></div>
            <span className='text-xl font-bold text'>Upload Resumes & JD</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Drag and drop your resumes and the job description — PDF, DOCX, or plain text.</p>
          </div>
          <div className="flex flex-col items-center gap-5  mt-10 w-[22vw] relative bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1]">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>02</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
            <span className='text-xl font-bold text'>AI Analyzes & Matches</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Our AI engine extracts skills, compares requirements, and scores each resume instantly.</p>
          </div>
          <div className="flex flex-col items-center gap-5  mt-10 w-[22vw] relative bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1]">
            <span className='text-sm font-semibold absolute right-5 top-5 text-gray-400'>03</span>
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <span className='text-xl font-bold text'>Get Your Report</span>
            <p className='text-sm mx-4 text-center w-full text-wrap text-slate-400'>Download a structured PDF report with match scores, skill gaps, and recommendations.</p>
          </div>
        </div>
      </div>
      <div className="feature flex flex-col items-center">
        <span className='text-lg font-bold text-teal-400 text-center mt-10'>FEATURES</span>
        <h1 className='text-4xl font-bold mt-3'>Everything you need to hire smarter</h1>
        <div className="step flex items-start justify-center gap-10 mb-10">
          <div className="flex flex-col  gap-5  mt-10 w-[25vw] items-left bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1] ">
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div>
            <span className='text-xl font-bold text'>Resume Scoring</span>
            <p className='text-sm text-left w-full text-wrap text-slate-400'>Each resume gets a smart compatibility score based on skills, experience, and keyword alignment.</p>
          </div>
          <div className="flex flex-col gap-5  mt-10 w-[25vw] items-left bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1]">
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>
            <span className='text-xl font-bold text'>Skill Match %</span>
            <p className='text-sm text-left w-full text-wrap text-slate-400'>See exactly which required skills are present, missing, or partially matched — at a glance.</p>
          </div>
          <div className="flex flex-col gap-5  mt-10 w-[25vw] items-left bg-white p-10 rounded-2xl border border-gray-300 hover:shadow-[0px_0px_10px_4px_#e0e1e1]">
            <div className="icon flex h-12 w-12 items-center justify-center rounded-lg bg-slate-200/50">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <span className='text-xl font-bold text'>PDF Report</span>
            <p className='text-sm text-left w-full text-wrap text-slate-400'>Download a clean, structured report you can share with your team or attach to your ATS.</p>
          </div>
        </div>
      </div>
      <div className="scard flex flex-col items-center mb-10">
        <span className='text-lg font-bold text-teal-400 text-center mt-10'>Sample Output</span>
        <h1 className='text-4xl font-bold my-3'>See what you'll get</h1>
        <div className="rounded-2xl border bg-white border-gray-300 shadow-[0px_0px_11px_4px_rgba(0,_0,_0,_0.1)] mt-8 p-8 w-150"><div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
          <div>
            <h3 className="font-bold text-foreground text-lg">Sarah Johnson</h3><p className="text-smtext-gray-400">Senior Frontend Developer</p></div>
          <div className="flex flex-col items-center"><div className="text-3xl font-bold text-teal-400">87%</div><span className="text-xs text-gray-400">Match Score</span></div></div>
          <div className="space-y-3 "><p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Skill Analysis</p><div className="flex items-center justify-between rounded-lg bg-gray-300/40 px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">React / TypeScript</span>
            <Tick find={true}/>
            </div><div className="flex items-center justify-between rounded-lg bg-gray-300/40  px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">Node.js</span>
            <Tick find={false}/>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-300/40 px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">AWS / Cloud</span>
            <Tick find={true}/>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-300/40 px-4 py-2.5"><span className="text-sm font-medium text-foreground">GraphQL</span>
            <Tick find={false}/></div>
            <div className="flex items-center justify-between rounded-lg bg-gray-300/40 px-4 py-2.5"><span className="text-sm font-medium text-foreground">CI/CD Pipelines</span> <Tick find={true}/></div></div><div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between text-xs text-gray-500 mb-2"><span>Overall Match</span><span>87%</span></div><div className="h-2 w-full rounded-full bg-gray-300">
                <div className="h-2 rounded-full bg-teal-500 transition-all w-[87%]"></div></div></div></div>
      </div>
      <div className='bg-[#214186] w-full h-full my-15 flex flex-col gap-5 items-center p-20'>
        <span className='text-[4rem] text-white font-bold'>Ready to hire smarter?</span>
        <p className='text-lg mx-4 font-semibold text-center w-150 text-wrap text-slate-400'>Upload your resumes and job description — get instant AI-powered matching results.</p>
        <div className="flex items-center gap-5">
          <button className='bg-gradient-to-r from-teal-500 to-emerald-400 via-cyan-300 cursor-pointer text-[#214186] font-bold py-3 px-6 rounded-lg mt-5 hover:bg-[#12e2c6] transition hover:scale-105 duration-300'>Start Analysing Resume</button>

        </div>
    </div>
    <div className="footer flex justify-between items-center px-4 mb-2">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center justify-center gap-2 scale-90">
                <div className=" bg-[#26dfc6] flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <svg className="h-5 w-5 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-lg font-heading font-bold text-green-900 text-foreground">
                  Resumer
                </span>
              </div></div>
              <p className='text-sm text-nowrap text-slate-500'>© 2026 ResumeMatchAI. All rights reserved.</p>
    </div>
    </div>
  )
}
