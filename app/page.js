'use client'
import React, { useState } from 'react'
import Jdform from "./components/Jdform";
import ResumeUpload from "./components/ResumeUpload";


export default function Home() {
  const [extarctedResume, setExtarctedResume] = useState();
  const [scoreCard, setScoreCard] = useState();
   const [files, setFiles] = useState(null);
  return (
    <>
    <div className="w-full flex p-5 gap-5 ">
      <Jdform className="w-[60%]" extarctedResume={extarctedResume} files={files} setExtarctedResume={setExtarctedResume} setScoreCard={setScoreCard}/>
      <ResumeUpload className="w-[40%]" extarctedResume={extarctedResume} setFiles={setFiles} setExtarctedResume={setExtarctedResume}/>
    </div>
    </>
  );
}
