'use client'
import React, { useState, useContext } from 'react'
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import mammoth from "mammoth";
import { useFiles } from "../context/context";

const ResumeUpload = (props) => {
  const { files, setFiles } = useFiles();
  const [dragOver, setDragOver] = useState(false);
  const [resumeText, setResumeText] = useState([]);



  const notify = (text) => {
    toast(text, {
      autoClose: 8000,
      customProgressBar: false,
      position: "top-right",
      type: "success",
    });
  };
  const extractPdfText = async (file) => {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const buffer = await file.arrayBuffer();

    if (file.name.split('.')[file.name.split('.').length - 1] === "pdf") {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        let lastY = null;
        let pageText = "";

        for (const item of content.items) {
          const y = item.transform[5];

          if (lastY !== null && Math.abs(lastY - y) > 2) {
            pageText += "\n";
          }
          pageText += item.str + " ";
          lastY = y;
        }

        text += pageText + "\n";
      }
      return text;
    } else {
      const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
      return value;
    }
  };

  const upload = async (file,add) => {
    console.log(file);
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const validFiles = file.filter(f => allowedTypes.includes(f.type));

    const validText = await Promise.all(
      validFiles.map(async (f) => {
        const text = await extractPdfText(f);
        return { name: f.name, text };
      })
    );
    setFiles(validFiles);
    console.log(validFiles);
    setResumeText(validText);
    console.log(validText);
    let res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validText),
      next: { revalidate: 0 },
    });
    let data = await res.json();
    add ? notify("Upload Successful!"): notify("File removed");
    props.setExtarctedResume(data);
    console.log(data);
    console.log(files);
    console.log(resumeText);

  }

  const del = (name) => {
    let newFiles = files.filter((f) => (
      f.name !== name
    ));
    console.log(newFiles);
    setFiles(newFiles);
    upload(newFiles,false);
  }
  const add = (file) => {
    let newfile = files;
    file.forEach((f) => newfile.push(f));
    console.log(newfile);
    upload(newfile,true);
  }


  return (<>
    <ToastContainer />

    <div className="w-1/2 bg-white p-6 rounded-xl border border-slate-300 flex flex-col gap-5 min-h-[80vh] justify-start">
      <div className="text-left text-xl font-semibold flex items-center gap-2 mb-2 text-gray-900">
        <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        Upload Resumes
      </div>
      <label htmlFor="file-upload" className='w-1/2 '>
        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); let file = Array.from(e.dataTransfer.files); upload(file); }} className={`${dragOver ? "border-teal-400 bg-slate-300/20 border-3 " : "hover:border-teal-200 border-2 hover:bg-slate-300/20"}  border-dashed rounded-xl border-slate-300 p-10 flex gap-5 flex-col items-center w-[42vw] h-[50vh] cursor-pointer`}>
          <div className="p-5 w-20 mt-15 h-20 bg-teal-200/30 rounded-xl">
            <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          </div>
          <h3 className='text-lg text-gray-900 font-semibold'>
            Drag files here or click to upload
            <div className='text-slate-400 text-center text-sm font-medium'>Supports PDF, DOC, DOCX</div>
          </h3>
          <input onChange={(e) => { 
            let file = Array.from(e.target.files); 
             add(file);
           }}
            id="file-upload"
            type="file" accept=".pdf,.doc,.docx"
            className="hidden"
            multiple
          />
        </div>
      </label>

      {(files && files.length >0 ) &&<div className="">
          <span className="text-sm font-semibold">{files.length} file selected</span>
        <div className=" max-h-50 overflow-auto">
          {files.map((f, i) => (
            <div key={i} className="card my-2">
              <div className="head flex justify-between text-sm px-4 py-2 border border-slate-300/70 rounded-xl bg-slate-100 w-full">
                <div className="flex gap-3 justify-center items-center">
                  <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span className='break-all max-w-96'>{f.name}</span></div>
                <div className="flex gap-5">
                  <span className='py-1 ' onClick={() => { del(f.name) }}>
                    <svg className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </span>
                </div>
              </div>
            </div>
          )
          )}
        </div></div>}
    </div>
  </>)
}

export default ResumeUpload