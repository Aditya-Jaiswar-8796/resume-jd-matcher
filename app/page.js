'use client'
import React, { useState } from 'react'
import Jdform from "./components/Jdform";
import ResumeUpload from "./components/ResumeUpload";


export default function Home() {
  const [extarctedResume, setExtarctedResume] = useState();
  return (
    <>
    <div className="w-full flex p-5 gap-5 ">
      <Jdform className="w-[60%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume}/>
      <ResumeUpload className="w-[40%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume}/>
    </div>
    </>
  );
}
