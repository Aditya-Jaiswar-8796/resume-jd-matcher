import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import crypto from "crypto";

export async function POST(request) {
  const body = await request.json();
  const { jd, resumes, files } = body;
  const results = resumes.map((resume) => {
    const jdSkills = jd.skills.map(skill =>
      skill.toLowerCase().trim()
    );
    const resumeSkills = resume.sections.skills
      .flatMap(skill => skill.split(/\s+/g))
      .map(skill => skill.toLowerCase().trim());
    const matchedSkills = jdSkills.filter(skill => resumeSkills.includes(skill));
    const skillMatchPercentage = (matchedSkills.length / jdSkills.length) * 100;
    let experience = resume.sections.experience ? "matched" : "not matched";
    let totalSkills = {
      skillMatchPercentage: skillMatchPercentage.toFixed(2),
      matchedSkills,
      unMatchedSkills: jdSkills.filter(skill => !matchedSkills.includes(skill)),
      extraSkills: resumeSkills.filter(skill => !matchedSkills.includes(skill)),
    };
    totalSkills.score = (skillMatchPercentage * 0.7) + (experience === "matched" ? 30 : 0);
    return {
      name: resume.name,
      totalSkills,
      experience,
      totalscore: totalSkills.score.toFixed(2),
    };
  });
  const analysisId = crypto.randomUUID();
store.set(analysisId, {
  results,
  files,
});

  return NextResponse.json({
    analysis: "completed",
    analysisId,
  });
}
