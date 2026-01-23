import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import crypto from "crypto";

export async function POST(request) {
  const body = await request.json();
  const { jd, resumes } = body;
  const results = resumes.map((resume) => {
    const jdSkills = jd.skills.map(skill =>
      skill.toLowerCase().trim()
    );
    if (!resume.sections.skills) {
      resume.sections.skills = [];
    }
    const resumeSkills = resume.sections.skills
      .flatMap(skill => skill.split(/\s+/g))
      .map(skill => skill.toLowerCase().trim());
    const matchedSkills = jdSkills.filter(skill => resumeSkills.includes(skill));
    const skillMatchScore = (matchedSkills.length / jdSkills.length) * 70;
    let totalSkills = {
      skillMatchScore: skillMatchScore.toFixed(2),
      matchedSkills,
      unMatchedSkills: jdSkills.filter(skill => !matchedSkills.includes(skill)),
      extraSkills: resumeSkills.filter(skill => !matchedSkills.includes(skill)),
    };
    let expScore = 0;
    if (jd.experience <= resume.sections.experience) {
      expScore = 20;
    }
    else {
      expScore = (resume.sections.experience /jd.experience ) * 20;
    }
    let jobs = jd.jobTitle.split(/\s+/g);
    let match = resume.text.includes(jobs);
    let titleScore = 0;
    match ? titleScore = (jobs.length / match.length) * 10 : titleScore = 0;
    let type = jd.employmentType;
    let preference = resume.text.includes(type);
    let typeScore = 0;
    if (!preference) {
     typeScore = 15;
    }else {
     typeScore = (preference.length / type.length) * 15;
    }
    let workMode = jd.workMode;
    let  workpre= resume.text.includes(workMode);
    let workModeScore = 0;
    if (!workpre) {
     workModeScore = 5;
    }else {
     workModeScore = (workpre.length / workMode.length) * 5;
    }
    const score = skillMatchScore + expScore + titleScore + typeScore + workModeScore;
    console.log(`Resume: ${resume.name}, Score: ${score.toFixed(2)}, skillMatchScore: ${skillMatchScore.toFixed(2)}, expScore: ${expScore.toFixed(2)}, titleScore: ${titleScore.toFixed(2)}, typeScore: ${typeScore.toFixed(2)}, workModeScore: ${workModeScore.toFixed(2)}`);
    return {
      id: resume.id,
      name: resume.name,
      totalSkills,
      experience: expScore.toFixed(2),
      titleScore: titleScore.toFixed(2),
      type: { typeScore: typeScore.toFixed(2),type, preference },
      workMode: { workModeScore: workModeScore.toFixed(2), workMode, workpre },
      totalscore: score.toFixed(2),
    };
  });
  const analysisId = crypto.randomUUID();
  store.set(analysisId, results);

  return NextResponse.json({
    analysis: "completed",
    analysisId,
  });
}
