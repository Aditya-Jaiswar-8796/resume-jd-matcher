import SmartParser from "pdf-parse-new/lib/SmartPDFParser";
import mammoth from "mammoth";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll('file') || [];
  const results = [];
  const parser = new SmartParser();
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const id = crypto.randomUUID();

    let filePath;

    if (file.name.split('.')[file.name.split('.').length - 1] === "pdf") {
      filePath = path.join(uploadDir, `${id}.pdf`);
      const data = await parser.parse(buffer);

      results.push({
        id,
        name: file.name,
        text: data.text,
      });

    } else {
      filePath = path.join(uploadDir, `${id}.docx`);
      const data = await mammoth.extractRawText(buffer);

      results.push({
        id,
        name: file.name,
        text: data.value,
      });
    }
    fs.writeFileSync(filePath, buffer);
    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }, 1000 * 60 * 30); // 30 minutes
  }
  const SECTION_MAP = {
    summary: /^(summary|profile)$/i,
    experience: /^(experience|work experience|employment)$/i,
    skills: /^(skills|technical skills|technologies)$/i,
    education: /^(education|academic)$/i,
    projects: /^(projects|open source)$/i
  };
  for (const result of results) {
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
            const n1Match = newLine.match(/^\d{4}/);
            const n2Match = newLine.match(/\d{4}$/);

            if (n1Match && n2Match) {
              const n1 = Number(n1Match[0]);
              const n2 = Number(n2Match[0]);
              newLine = n2 - n1;
              console.log("Experience Line:", newLine);
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
      result.sections.experience = result.sections.experience.reduce((acc, curr) => acc + curr);
    }
    result.text = result.text
      .replace(/\s+/g, " ");
  }


  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}