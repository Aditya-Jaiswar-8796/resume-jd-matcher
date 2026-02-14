'use client'
import React, { useState } from 'react'
import Jdform from "@/app/components/Jdform";
import ResumeUpload from "@/app/components/ResumeUpload";


export default function Home() {
  const [extarctedResume, setExtarctedResume] = useState();
  const [scoreCard, setScoreCard] = useState();
  return (
    <>
    <div className="w-full bg-slate-100 py-24 px-5">
    <h1 className='flex gap-2 text-3xl font-bold mx-4'>
      Resume <span className='text-teal-500'>Analyser</span>
    </h1>
    <p className='text-slate-400 mx-4 my-2'>Fill in the job details and upload resumes to get instant match scores.</p>
    <div className="w-full flex p-5 gap-5  py-7">
      <Jdform className="w-[60%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume} setScoreCard={setScoreCard}/>
      <ResumeUpload className="w-[40%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume}/>
    </div></div>
    </>
  );
}
