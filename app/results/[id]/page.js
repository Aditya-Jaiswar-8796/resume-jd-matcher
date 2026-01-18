'use client'
import React, { useEffect, useState } from "react";

const ResultsPage = ({ params }) => {
  const [preview, setPreview] = useState(false);
  const { id } = React.use(params)
  const [resumes, setResumes] = useState();
  useEffect(() => {
    if (!id) {
      console.log("Missing results id");
    };
    console.log(id);

    loadFlies();
  }, []);
function getScoreColor(score) {
  if (score >= 80) return "text-green-500 bg-green-100";
  if (score >= 60) return "text-yellow-600 bg-yellow-100";
  if (score >= 40) return "text-orange-500 bg-orange-100";
  return "text-red-500 bg-red-100";
}
  const loadFlies = async () => {
    console.log("Fetching results for id:", id);
    const res = await fetch(
      `/api/results`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      cache: "no-store"
    }
    );
    const data = await res.json();
    setResumes(data.results);
    console.log(data.results);
    console.log(data.files);
  }
  return (
  <div className="relative h-[100vh] w-full flex flex-col gap-5 bg-indigo-950"><div class="absolute inset-0 bg-cyan-400  bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
  <div className=" top-30 left-30 absolute w-40 h-40 skew-12 blur-3xl bg-blue-500/60 rounded-full"></div>
  <div className=" top-50 left-200 absolute w-72 h-72 skew-12 blur-3xl bg-blue-400/30 rounded-full"></div>
    <h1 className="text-center text-[4rem] m-4  text-cyan-300 fill-cyan-500 drop-shadow-lg drop-shadow-cyan-500 ">Resume Ranking</h1>
    <div className="border-4 my-4 mx-12 max-w-100 max-h-112 bg-blue-300/20 border-blue-500 shadow-[inset_0_0_10px_#005a70] rounded-lg p-5 flex flex-wrap gap-4 ">
    {resumes ? resumes.sort((a, b) => b.totalscore - a.totalscore).map((r, i) => (
      <div key={i} className="p-5 relative border-2 border-yellow-100  text-white  rounded-lg shadow-[inset_0_0_10px_aqua] flex flex-col items-center gap-2 w-56 bg-cyan-300/30">
        <h3>{r.name}</h3>
        <p><span className="text-[#000875d7] font-bold">Score:</span> <span className={`px-2 py-1 rounded-full font-bold ${getScoreColor(parseFloat(r.totalscore))}`}>{r.totalscore}</span></p>
        <div className="">
        <p><span className="text-[#000875d7] font-bold">Matched Skills:</span> {r.totalSkills.matchedSkills}</p>
        <p><span className="text-[#000875d7] font-bold">Unmatched Skills:</span> {r.totalSkills.unMatchedSkills}</p></div>
      </div>
    )) : <p className=" border-b-4 border-b-sky-700 w-10 h-10 rounded-b-full animate-spin delay-100 duration-700 absolute top-[50%] left-[50%]"></p>}
</div>


</div>
)
}

export default ResultsPage
