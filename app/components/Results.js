'use client'
import React, { useState, useEffect } from 'react'
const Results = (props) => {
    const [match, setMatch] = useState({})
    const files = props.files;
    const results = props.results;




    useEffect(() => {
        let avg = 0, weak = 0, good = 0, strong = 0;
        if (results) {
            let score;
            for (let i = 0; i < results.length; i++) {
                score = Number(results[i].totalscore);
                if (score >= 80) {
                    strong++;
                } else if (score < 80 && score > 50) {
                    good++;
                } else {
                    weak++;
                }
                avg += score;
            }
            console.log(avg,"gcukyawvrrykgbj")
            console.log(results.length)
            avg = avg / (results.length);
            console.log(avg)
            results.forEach(result => {
                files.forEach(f => {
                    if (f.name == result.name) {
                        result.size = f.size;
                    }
                });
            });
        }
        setMatch({ avg, weak, good, strong })

    }, [results])




    const download = async () => {
        const newRes = await fetch("/api/printresult", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ results: resumes })
        });

        const buffer = await newRes.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume-screening-report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    if (!results) {
        return (
            <div className=""></div>
        )
    }
    return (
        <div className='w-full bg-slate-100 py-2 px-5'>

            <h1 className='flex gap-2 text-2xl font-bold'>
                Analysis <span className='text-teal-500'>Results</span>
            </h1>
            <p className='text-slate-500 text-sm  my-2'>Resumes ranked by match score · click the <span className='text-black/90'>eye icon</span> to preview a file</p>
            <div className='w-full my-4 bg-white px-6 py-3 rounded-xl border border-slate-300 flex flex-col gap-5 justify-start'>
                <div className="flex justify-between items-center">
                    <span ><h3 className='flex gap-2 text-lg font-semibold'>Analysis Complete</h3>
                        <p className='text-slate-500 text-sm flex gap-3'>Role:<span className='text-black font-semibold'>{results[0].jobTitle}</span></p></span>
                    <span className='flex gap-3 justify-center  items-center'>
                        <div className="rounded-full py-1 px-4 border border-[#05b19a] bg-[#00e9ca]/10 text-xs font-semibold text-[#05b19a] w-fit">{results.length} resume analysed</div>
                        <div className="rounded-full py-1 flex gap-2 items-center px-4 border hover:border-[#05b19a] bg-slate-100 border-slate-300 text-gray-900 text-xs font-semibold hover:text-[#05b19a] w-fit">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Download CSV
                        </div>
                    </span>
                </div>
                <div className='flex gap-3 mb-2'>
                    <div className='bg-slate-100 pb-2 pt-4 px-5 rounded-xl border border-slate-300 flex flex-col justify-center items-center w-40 flex-1'>
                        <h2 className='text-teal-500 text-2xl font-bold'>{match.avg}%</h2>
                        <p className='text-slate-500 text-sm Avg Match Score'>Avg Match Score</p>
                    </div>
                    <div className='bg-slate-100 pb-2 pt-4 px-5 rounded-xl border border-slate-300 flex flex-col justify-center items-center w-40 flex-1'>
                        <h2 className='text-teal-500 text-2xl font-bold'>{match.strong}</h2>
                        <p className='text-slate-500 text-sm Avg Match Score'>Strong Matches</p>
                    </div>
                    <div className='bg-slate-100 pb-2 pt-4 px-5 rounded-xl border border-slate-300 flex flex-col justify-center items-center w-40 flex-1'>
                        <h2 className='text-yellow-500 text-2xl font-bold'>{match.good}</h2>
                        <p className='text-slate-500 text-sm Avg Match Score'>Good Matches</p>
                    </div>
                    <div className='bg-slate-100 pb-2 pt-4 px-5 rounded-xl border border-slate-300 flex flex-col justify-center items-center w-40 flex-1'>
                        <h2 className='text-red-500 text-2xl font-bold'>{match.weak}</h2>
                        <p className='text-slate-500 text-sm Avg Match Score'>Weak Matches</p>
                    </div>
                </div>
            </div>

            {results.map((result, i) =>
                <div key={i} className="card my-2 ">
                    <div className="head flex hover:shadow-[0px_5px_4px_1px_#d4d5d6] transition-shadow duration-200 justify-between text-sm px-4 py-4 border border-slate-300/70 rounded-xl bg-white border-b-2 w-full">
                        <div className="flex gap-3 justify-center items-center">
                            <div className='w-8 h-8 text-white font-bold mr-2 rounded-full bg-[#05b19a] text-center p-1.5' >{i+1}</div>
                            <div className="shrink-0 w-8 h-8 rounded-xl  p-1 gap-2 bg-slate-100  text-xs font-semibold text-[#05b19a] flex items-center justify-center"><svg className="w-4 h-4 text-accent " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                            <div>
                                <h3 className='text-gray-900  font-semibold'>{result.name}</h3>
                                <p className='text-slate-500 text-xs'>
                                    {result.size}KB
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-3 justify-center  items-center'>
                            <div className='bg-slate-100 p-1 rounded-xl border  border-slate-300 flex flex-col justify-center items-center px-3 '>
                                <h2 className='text-teal-500 text-lg font-bold '>{result.totalscore}%</h2>
                                <p className='text-slate-500 text-xs '>match</p>
                            </div>
                            <div className="rounded-full py-1 px-3 border border-[#25cfb9]/40 bg-[#21e7cd]/8 text-xs font-semibold text-[#05b19a] w-fit">
                            {result.color.comment}
                            </div>
                            <div className="rounded-lg p-1 justify-center w-7 h-7 flex gap-2 items-center border hover:border-[#05b19a] bg-slate-100 border-slate-300 text-slate-500 text-xs font-semibold hover:text-[#05b19a] scale-125 ml-2 mr-1">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </div>
                            <div className="rounded-lg p-1 justify-center w-7 h-7 flex gap-2 items-center border hover:border-[#05b19a] bg-slate-100 border-slate-300 text-slate-500 text-xs font-semibold hover:text-[#05b19a] scale-125">
                                <svg className="w-4 h-4 transition-transform duration-200 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Results
