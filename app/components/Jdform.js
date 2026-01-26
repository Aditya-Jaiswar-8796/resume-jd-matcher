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
    <div className='flex flex-col shadow-[1px_1px_.2rem_grey] bg-indigo-300 border-gray-900/50 p-5 w-1/2 '>
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
      <div className="relative">

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
          <div className="">
            <label htmlFor="jobTitle" className='text-sm font-bold px-3 ' >Job Title</label>
            <div className="relative px-3 py-1 border-2 rounded-md shadow-[1px_1px_.3rem_inset] border-gray-500">
              <input {...register("jobTitle", { required: true, minLength: {value : 3 , message: "Job Title's min length is 3"} })} type="text" id="jobTitle" className='w-full bg-transparent outline-0 text-sm text-blue-950 font-semibold ' placeholder=' ' />
            </div></div>
          <div className="">
            <label htmlFor="skills" className='text-sm font-bold px-3' >Skills</label>
            <div className="relative px-3 flex justify-between py-1 border-2 rounded-md shadow-[1px_1px_.3rem_inset] border-gray-500">
              <input ref={skillIn} type="text" id="skills" className='w-full appearance-none outline-0 text-sm text-blue-950 font-semibold ' placeholder="Enter the skills " />
              <img src="/add1.png" onClick={() => {
                const value = skillIn.current.value.trim();
                if (!value) return;
                setSkills(prev => [...prev, value]);
                skillIn.current.value = "";
              }} className='w-8 ' alt="" />
            </div><div className="px-1 flex flex-wrap gap-3 pt-2 w-full">
              {skills.map((s, i) => (<span key={i} className="bg-blue-900/50 flex gap-2 px-2 py-1 rounded-lg justify-center items-center text-white text-lg font-semibold"><span>{s}</span>
                <img onClick={() => { setSkills(prev => prev.filter((f) => f !== s)) }} src="/remove.png" className='w-6 ' alt="" />
              </span>))}
            </div>

          </div>

          <div className="">
            <label htmlFor="experience" className='text-sm font-bold px-3 ' >Minimum Experience (Years)</label>
            <div className="relative px-3 py-1 border-2 rounded-md shadow-[1px_1px_.3rem_inset] border-gray-500">
              <input {...register("experience", { required: true })} type="text" id="experience" className='w-full bg-transparent outline-0 text-sm text-blue-950 font-semibold ' placeholder='' />
            </div></div>
          <div className="">
            <label htmlFor="employmentType" className='text-sm font-bold px-3 ' >Employment Type</label>
            <div className="relative px-3 py-1 border-2 flex gap-5 justify-around rounded-md shadow-[1px_1px_.3rem_inset] border-gray-500">
              <span> <input type="checkbox" value="full-time" {...register("employmentType", { required: true })} /> <span>Full-time</span></span>
              <span> <input type="checkbox" value="contract" {...register("employmentType", { required: true })} /> <span>Contract</span></span>
              <span> <input type="checkbox" value="internship" {...register("employmentType", { required: true })} /> <span>Internship</span></span>
            </div></div>
          <div className="">
            <label htmlFor="workMode" className='text-sm font-bold px-3 ' >Working Mode</label>
            <div className="relative px-3 py-1 border-2 flex gap-5 justify-around rounded-md shadow-[1px_1px_.3rem_inset] border-gray-500">
              <span> <input type="checkbox" value="remote" {...register("workMode", { required: true })} /> <span>Remote</span></span>
              <span> <input type="checkbox" value="onsite" {...register("workMode", { required: true })} /> <span>Onsite</span></span>
              <span> <input type="checkbox" value="hybride" {...register("workMode", { required: true })} /> <span>Hybride</span></span>
            </div></div><div className="hidden">
          {errors.jobTitle && notify(errors.jobTitle.message || "Job Title is required")}
          {errors.experience && notify("Experience is required")}
          {errors.employmentType && notify("Employment Type is required")}
          {errors.workMode && notify("Work Mode is required")}
          </div>
          <label htmlFor="submit"><div className="px-3 mt-2 absolute left-[41%] hover:bg-blue-600 shadow-[1px_1px_1px_3px_blue] active:shadow-[1px_1px_3px_black] py-2 bg-blue-800 text-white font-bold rounded-lg text-center w-min text-nowrap">Analyse Resume</div>
            <input type="submit" id='submit' className='hidden' placeholder='' />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Jdform
