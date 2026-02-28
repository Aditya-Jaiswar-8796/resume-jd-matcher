'use client'
import React, { useState, useRef } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Jdform = (props) => {
  const router = useRouter();
  const [skills, setSkills] = useState([])
  const skillIn = useRef();
  const [Jdform, setJdform] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    if (skills.length === 0) {
      toast("Please add at least one skill");
      return;
    }
    if (!props.extarctedResume || props.extarctedResume.length === 0) {
      toast("Please upload at least one resume");
      return;
    }
    data.skills = skills;
    console.log("loading...");
    setJdform(data);
    let send = await fetch("/api/analyse", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd: data, resumes: props.extarctedResume }),
    });
    let res = await send.json();
    router.push(`/results/${res.analysisId}`);
    console.log(res)
    toast("Analysing", {
      autoClose: 8000,
      customProgressBar: false,
      position: "top-right",
      type: "default",
    })
  }
  const notify = (say) => toast(say);

  return (
    <div className='flex flex-col w-1/2 bg-white p-6 rounded-xl border border-slate-300 '>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="text-left text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
        <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Job Details
      </div>
      <div className="relative">

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
          <div className="">
            <label htmlFor="jobTitle" className='text-sm text-left font-semibold' >Job Title</label>
            <div className="relative px-4 py-2 border border-slate-300/70 rounded-xl bg-slate-100 mt-2">
              <input {...register("jobTitle", { required: true, minLength: { value: 3, message: "Job Title's min length is 3" } })} type="text" id="jobTitle" className='w-full outline-0 text-sm ' placeholder='e.g. Frontend Developer' />
            </div></div>
          <div className="">
            <label htmlFor="skills" className='text-sm text-left font-semibold' >Skills</label>
            <div className="relative flex justify-between gap-2 items-end">
              <div className="   px-4 py-2 border border-slate-300/70 rounded-xl w-full bg-slate-100 mt-2">
                <input ref={skillIn} type="text" id="skills" className='w-full appearance-none outline-0 text-sm ' placeholder="Enter a skill and press add" />
              </div>
              <span onClick={() => {
                const value = skillIn.current.value.trim();
                if (!value) return;
                setSkills(prev => [...prev, value]);
                skillIn.current.value = "";
              }} className="rounded-xl bg-teal-500 px-3 py-[.70rem] hover-scale-105 active:scale-95 shadow-[1px_1px_.5rem_teal] cursor-pointer">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              </span>
            </div>
            <div className="px-1 flex flex-wrap gap-3 pt-2 w-full">
              {skills.map((s, i) => (<span key={i} className="bg-white border border-slate-300 flex gap-2 px-2 py-1 rounded-xl justify-center items-center text-sm"><span>{s}</span>
                <svg onClick={() => { setSkills(prev => prev.filter((f) => f !== s)) }} className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
              </span>))}
            </div>

          </div>

          <div className="">
            <label htmlFor="experience" className='text-sm text-left font-semibold ' >Minimum Experience (Years)</label>
            <div className="relative px-4 py-2 border border-slate-300/70 rounded-xl w-full bg-slate-100 mt-2">
              <input {...register("experience", { required: true })} type="text" id="experience" className='w-full bg-transparent outline-0 text-sm text-blue-950 font-semibold ' placeholder='' />
            </div></div>
          <div className="">
            <label htmlFor="employmentType" className='text-sm text-left font-semibold' >Employment Type</label>
            <div className="relative flex gap-3 justify-start ">
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('1'); !checkbox.checked &&  e.target.style.setProperty("border-color", "teal");  }
                } htmlFor='1' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="1" value="full-time" {...register("employmentType", { required: true })} /> Full-time</label>
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('2'); !checkbox.checked &&  e.target.style.setProperty("border-color", "teal");  }
                }  htmlFor='2' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="2" value="contract" {...register("employmentType", { required: true })} /> Contract</label>
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('3'); !checkbox.checked &&  e.target.style.setProperty("border-color", "teal");  }
                } htmlFor='3' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="3" value="internship" {...register("employmentType", { required: true })} /> Internship</label>
            </div></div>
          <div className="">
            <label htmlFor="workMode" className='text-sm text-left font-semibold ' >Working Mode</label>
            <div className="relative flex gap-3 justify-start ">
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('1w'); 
                 !checkbox.checked &&  e.target.style.setProperty("border-color", "teal"),e.target.style.setProperty("color","teal"),e.target.style.setProperty("font-weight","500");
                }
                } htmlFor='1w' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="1w" value="remote" {...register("workMode", { required: true })} /> Remote</label>
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('2w'); !checkbox.checked &&  e.target.style.setProperty("border-color", "teal");  }
                } htmlFor='2w' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="2w" value="onsite" {...register("workMode", { required: true })} /> Onsite</label>
              <label onClick={(e) => { 
                 let checkbox = document.getElementById('3w'); !checkbox.checked &&    }
                } htmlFor='3w' className='px-4 py-2 border border-slate-300/70 rounded-xl text-sm text-slate-500 w-fit bg-slate-100 mt-2'> <input type="checkbox" className='hidden' id="3w" value="hybride" {...register("workMode", { required: true })} /> Hybride</label>
            </div></div><div className="hidden">
            {errors.jobTitle && notify(errors.jobTitle.message || "Job Title is required")}
            {errors.experience && notify("Experience is required")}
            {errors.employmentType && notify("Employment Type is required")}
            {errors.workMode && notify("Work Mode is required")}
          </div>
          <label htmlFor="submit" className="flex justify-center items-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 via-teal-200 text-blue-800/70 font-bold rounded-xl bg-accent px-5 py-2.5 text-sm text-accent-foreground transition-all hover:opacity-90 hover:scale-105">
          <svg className="h-4 w-4 opacity-70" fill="navy" viewBox="0 0 24 24" stroke="navy" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>Analyse Resume
            <input type="submit" id='submit' className='hidden' placeholder='' />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Jdform
