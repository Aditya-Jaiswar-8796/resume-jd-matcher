'use client'
import React, { useEffect, useState } from "react";

const ResultsPage = ({ params }) => {
  const [preview, setPreview] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();
  const [url, setUrl] = useState();
  const { id } = React.use(params)
  const [resumes, setResumes] = useState();
  const [more, setMore] = useState(null);
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
    let { results } = data;
    console.log("Results data:", results);
    results.length !== 1 && results.sort((a, b) => b.totalscore - a.totalscore);
    setResumes(results);
    console.log(data);

    const newRes = await fetch("/api/printresult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results })
    });

    const buffer = await newRes.arrayBuffer();
    const blob = new Blob([buffer], { type: "application/pdf" });
    
    let urld = URL.createObjectURL(blob);
    setUrl(urld);
    const a = document.createElement("a");
    a.href = urld;
    a.download = "resume-screening-report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(urld);

  }
  return (
    <div className="relative h-[100vh] w-full flex flex-col gap-5 bg-indigo-950 items-center"><div className="absolute inset-0 bg-cyan-400  bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <div className=" top-30 left-30 absolute w-40 h-40 skew-12 blur-3xl bg-blue-500/60 rounded-full"></div>
      <div className=" top-50 left-200 absolute w-72 h-72 skew-12 blur-3xl  bg-blue-400/30 rounded-full"></div>
      <h1 className="text-center text-[4rem] mx-4  text-cyan-300 fill-cyan-500 drop-shadow-lg drop-shadow-cyan-500 ">Resume Ranking</h1>
      <div className="flex justify-center w-full h-full">
        <div className="border-4  my-4 mx-10 grow w-150 max-h-112 overflow-auto bg-blue-300/20 border-blue-500 shadow-[inset_0_0_10px_#005a70] rounded-lg p-5 flex flex-wrap items-start gap-4 ">
          {resumes ? resumes.map((r, i) => (
            <div key={r.id} className="p-5 relative border-2 border-yellow-100  text-white  rounded-lg shadow-[inset_0_0_10px_aqua] flex flex-col items-center justify-center gap-2 w-56 bg-cyan-300/30">
              <svg onClick={() => {
                more === r ? setMore(null) : setMore(r);
                console.log(more);

              }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2854C5"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
              <h3 onClick={() => {
                pdfUrl === `/uploads/${r.id}.pdf` ? setPreview(!preview) : setPreview(true);
                setPdfUrl(`/uploads/${r.id}.pdf`);
              }}>{r.name}</h3>
              <p><span className="text-[#000875d7] font-bold">Score:</span> <span className={`px-2 py-1 rounded-full font-bold drop-shadow-lg drop-shadow-cyan-500 ${getScoreColor(parseFloat(r.totalscore))}`}>{r.totalscore}</span></p>

              <div className="w-full bg-green-300/30 border-2  relative rounded-full h-5 mb-2 ">
                <div className={`bg-green-400 text-xs  absolute top-0  font-medium text-white text-center p-0.5 rounded-full h-4 flex items-center justify-center w-[${parseFloat(Number(r.totalscore))}%]`}>{parseFloat(r.totalscore)}%</div>
              </div>
              <div className="w-full">
                <p><span className="text-[#000875d7] font-bold">✔ Top skills:</span> {r.totalSkills.matchedSkills.map((s) => { return s + ", " })}</p>
                <p><span className="text-[#000875d7] font-bold">⚠ Missing:</span> {r.totalSkills.unMatchedSkills.map((s) => { return s + ", " })}</p></div>
            </div>
          )) : <p className=" border-b-4 border-b-sky-700 w-10 h-10 rounded-b-full animate-spin delay-100 duration-700 absolute top-[50%] left-[50%]"></p>}
        </div>
        {more && <div className="breakDown border-4 mr-10 my-4 bg-blue-500/30 border-cyan-500 rounded-lg shadow-lg p-5 text-white bg-indigo-950/80 h-[450px] w-fit">
          <p><span className="">Skills: {parseFloat(Number(more?.totalSkills?.skillMatchScore))} / 50</span> { }</p>
          <p><span className="">Experience: {parseFloat(Number(more?.experience))} / 20</span> { }</p>
          <p><span className="">Job Title:  {parseFloat(Number(more.titleScore))} / 10</span> </p>
          <p><span className="">Employment Type: {parseFloat(Number(more?.type?.typeScore))} / 15</span> { }</p>
          <p><span className="">Work Mode:  {parseFloat(Number(more?.workMode?.workModeScore))} / 5</span> { }</p>
        </div>}
        {preview && (
          <embed className="z-10 border-4 mr-10 my-4 border-cyan-500 rounded-lg shadow-lg"
            src={pdfUrl}
            type={`application/pdf`}
            width="800px"
            height="450px"
          />
        )}
      </div>
    </div>
  )
}

export default ResultsPage
