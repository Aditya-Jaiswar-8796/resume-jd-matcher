'use client'
import React, { useState } from 'react'

const ResumeUpload = () => {
  const [files, setFiles] = useState(null);

  const upload = (file) => {
    console.log(file);
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    let valid = [];
    file.forEach(f => {
      if (allowedTypes.includes(f.type)) {
        valid.push(f);
      }
    }
    );
    setFiles(valid);
    console.log(valid);
  }

  const del= (name) => { 
    let newFiles = files.filter((f)=>(
      f.name !== name
    ));
    console.log(newFiles);
    
    setFiles(newFiles)
   }


  return (<>{!files ?
    <label htmlFor="file-upload" className='w-1/2 '>
      <div onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); let file = Array.from(e.dataTransfer.files); upload(file); }} className=' shadow-[1px_1px_.2rem_grey] gap-4 min-h-[80vh] border-gray-900/50 p-5 w-full flex items-center flex-col justify-around'>
        <div className="relative group ">
          <img
            src="/upload.png"
            alt=""
            className="group-hover:opacity-0 transition-opacity w-[12rem]"
          />

          <img
            src="/upload.gif"
            alt=""
            className="absolute top-5 inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 w-[18rem] scale-150"
          />
        </div>
        <h1 className='text-xl text-gray-900 font-semibold'>
          Drag files here or click to upload
        </h1>
        <input onChange={(e) => { let file = Array.from(e.target.files); upload(file); }}
          id="file-upload"
          type="file" accept=".pdf,.doc,.docx"
          className="hidden"
          multiple
        />
      </div></label> :
    <div onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); let file = Array.from(e.dataTransfer.files); upload(file); }} className=' shadow-[1px_1px_.2rem_grey] gap-4 min-h-[80vh] border-gray-900/50 p-5 w-1/2 flex items-center flex-col justify-between'><div className=" h-[80%] overflow-y-auto w-full">
      <div className="head flex justify-between border-b-2 border-blue-300 text-md text-blue-950 font-medium px-3 ">
        <span>Name</span>
        <div className="flex gap-4 ">
          <span>Type</span>
          <span>Size</span>
          <span className='w-10'></span>
        </div>
      </div>
      {files.map((f, i) => (
        <div key={i} className="card my-2">
          <div className="head flex justify-between text-sm shadow-[inset_0_0_10px_#005a70] text-blue-950 px-3 py-2 border-2 border-blue-500 bg-blue-500/30 rounded-lg w-full">
            <span className='break-all'>{f.name}</span>
            <div className="flex gap-5">
              {/* <span>{f.type.split('/').pop()}</span> */}
              <span>{f.name.split('.')[f.name.split('.').length-1]}</span>
              <span>{((f.size/1024)/1024).toFixed(2)}MB</span>
              <span onClick={() => {del(f.name) }}><img width={20} src="/delete1.png" alt="" /></span>
            </div>
          </div>
          </div>
      )
      )}</div>
    </div>
  }
    </>)
}

    export default ResumeUpload
