import React from 'react'
import Link from 'next/link' 

const Navbar = () => {
  return (<>
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-400/50 bg-[#f7f7f9] backdrop-blur-xl animate-fade-down">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ml-5 gap-2">
          <div className=" bg-[#26dfc6] flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <svg className="h-5 w-5 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <Link href="/">
          <span className="text-lg font-heading font-bold text-green-900 text-foreground">
            Resumer-<span className="text-green-600/50 ">Smart Screening</span>
          </span>
          </Link>
        </div>
        <Link
          href="/tool"
          className="inline-flex items-center gap-2 bg-[#26dfc6] text-white rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:opacity-90 hover:scale-105"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started
        </Link>
      </div>
    </nav>
  </>)
}

export default Navbar
