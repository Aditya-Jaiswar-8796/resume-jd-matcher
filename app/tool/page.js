'use client'
import React, { useState } from 'react'
import Jdform from "@/app/components/Jdform";
import ResumeUpload from "@/app/components/ResumeUpload";
import Results from "@/app/components/Results";


export default function Home() {
  const [extarctedResume, setExtarctedResume] = useState();
  const [results,setResults] = useState();
  const [files, setFiles] = useState([]);


  return (
    <>
    <div className="w-full bg-slate-100 py-24 px-5">
    <h1 className='flex gap-2 text-3xl font-bold mx-4'>
      Resume <span className='text-teal-500'>Analyser</span>
    </h1>
    <p className='text-slate-400 mx-4 my-2'>Fill in the job details and upload resumes to get instant match scores.</p>
    <div className="w-full flex px-5 gap-5  py-7">
      <Jdform className="w-[60%]" extarctedResume={extarctedResume} setResults={setResults} setExtarctedResume={setExtarctedResume}/>
      <ResumeUpload className="w-[40%]" files={files} setFiles={setFiles} extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume}/>
    </div>

    <Results results={results} files={files}/>
    
    </div>
    </>
  );
}
