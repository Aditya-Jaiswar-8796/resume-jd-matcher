import crypto from 'crypto';
import { log } from 'console';
export async function POST(req) {
const data = await req.json();
  const results = data;

  const SECTION_MAP = {
    summary: /^(summary|profile)$/i,
    experience: /^(experience|work experience|employment|work history)$/i,
    skills: /^(skills|technical skills|technologies)$/i,
    education: /^(education|academic)$/i,
    projects: /^(projects|open source)$/i
  };
  for (const result of results) {
    result.id = crypto.randomUUID();
    result.rawText = result.text
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\S+@\S+\.\S+/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/(\+?\d{10,})/g, "")
      .split("\n").filter(value => Boolean(value));

    result.sections = {};
    let currentSection = null;
    for (const line of result.rawText) {
      if (typeof line !== "string") return;
      let isSectionHeader = false;
      for (const [key, value] of Object.entries(SECTION_MAP)) {
        if (value.test(line.trim())) {
          currentSection = key;
          if (!result.sections[currentSection]) {
            result.sections[currentSection] = [];
          }
          isSectionHeader = true;
          break;
        }
      }
      if (!isSectionHeader && currentSection) {
        if (SECTION_MAP.experience.test(currentSection)) {
          let newLine = line.replace(/[^\d{4}\s+\-*\d{4}]/gi, "").trim();
          if (newLine !== "") {
            const n1Match = newLine.match(/\d{4}\s/);
            const n2Match = newLine.match(/\d{4}$/);

            if (n1Match && n2Match) {
              const n1 = Number(n1Match[0]);
              const n2 = Number(n2Match[0]);
              newLine = n2 - n1;
              log("Experience Line:", newLine);
              result.sections[currentSection].push(newLine);
            }
          }
        }
        else {
          result.sections[currentSection].push(line);
        }
      }
    }
    if (result.sections.experience) {
      if (result.sections.experience.length > 0) {
        result.sections.experience = result.sections.experience.reduce((acc, curr) => acc + curr);
      } else {
        result.sections.experience = 0;
      }
    }
    result.text = result.text
      .replace(/\s+/g, " ");
  }


  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}