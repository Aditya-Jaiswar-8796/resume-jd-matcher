'use client'
import React, { useState } from 'react'
import Jdform from "@/app/components/Jdform";
import ResumeUpload from "@/app/components/ResumeUpload";


export default function Home() {
  const [extarctedResume, setExtarctedResume] = useState();
  const [scoreCard, setScoreCard] = useState();
  return (
    <>
    <div className="w-full flex p-5 gap-5  ">
      <Jdform className="w-[60%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume} setScoreCard={setScoreCard}/>
      <ResumeUpload className="w-[40%]" extarctedResume={extarctedResume} setExtarctedResume={setExtarctedResume}/>
    </div>
    </>
  );
}
