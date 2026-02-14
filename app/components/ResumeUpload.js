'use client'
import React, { useState, useContext } from 'react'
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import mammoth from "mammoth";
import { useFiles } from "../context/context";

const ResumeUpload = (props) => {
  const { files, setFiles } = useFiles();
  const [dragOver, setDragOver] = useState(false);
  const [resumeText, setResumeText] = useState([]);



  const notify = () => {
    toast("Upload Successful!", {
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

  const upload = async (file) => {
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
    notify();
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
    upload(newFiles);
  }
  const add = (file) => {
    let newfile = files;
    file.forEach((f) => newfile.push(f));
    console.log(newfile);
    upload(newfile);
  }


  return (<>
    <ToastContainer />
    {files && files.length ? <div onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); let file = Array.from(e.dataTransfer.files); upload(file); }} className=' shadow-[1px_1px_.2rem_grey] gap-4 min-h-[80vh] border-gray-900/50 p-5 w-1/2 flex items-center flex-col justify-between'>
      <div className=" h-[80%] overflow-y-auto w-full">
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
              <span className='break-all max-w-96'>{f.name}</span>
              <div className="flex gap-5">
                <span>{f.name.split('.')[f.name.split('.').length - 1]}</span>
                <span>{((f.size / 1024) / 1024).toFixed(2)}MB</span>
                <span onClick={() => { del(f.name) }}>
                  <img width={20} src="/delete1.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        )
        )}
      </div>
      <div className="btn flex gap-4"> <label htmlFor="file">
        <div type="button" className="text-white bg-gradient-to-r rounded-xl active:scale-95 shadow-[1px_2px_.5rem_blue] from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Add More!</div>
        <input onChange={(e) => { let file = Array.from(e.target.files); add(file); }}
          id="file"
          type="file" accept=".pdf,.doc,.docx"
          className="hidden"
          multiple
        /></label>
      </div>
    </div>
      : <div className="w-1/2 bg-white p-6 rounded-xl border border-slate-300 flex flex-col gap-5 min-h-[80vh] justify-start">
        <div className="text-left text-xl font-semibold flex items-center gap-2 mb-2 text-gray-900">
          <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Upload Resumes
        </div>
        <label htmlFor="file-upload" className='w-1/2 '>
          <div onDragOver={(e) => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); let file = Array.from(e.dataTransfer.files); upload(file); }} className={`${dragOver ? "" : ""}  border-dashed rounded-xl border-2 border-slate-300 p-10 flex gap-5 flex-col items-center w-[42vw] h-[50vh] cursor-pointer`}>
            <div className="p-5 w-20 mt-15 h-20 bg-teal-200/30 rounded-xl">
              <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <h3 className='text-lg text-gray-900 font-semibold'>
              Drag files here or click to upload
            <div className='text-slate-400 text-center text-sm font-medium'>Supports PDF, DOC, DOCX</div>
            </h3>
            <input onChange={(e) => { let file = Array.from(e.target.files); upload(file); }}
              id="file-upload"
              type="file" accept=".pdf,.doc,.docx"
              className="hidden"
              multiple
            />
          </div>
        </label>
      </div>}

  </>)
}

export default ResumeUpload