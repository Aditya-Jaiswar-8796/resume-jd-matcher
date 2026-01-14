import SmartParser from "pdf-parse-new/lib/SmartPDFParser";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll('file') || [];
  const results = [];
const parser = new SmartParser();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (file.name.split('.')[file.name.split('.').length - 1] === "pdf") {
      const data = await parser.parse(buffer);
      
      results.push({
        name: file.name,
        text: data.text,

      });
      
    } else {
      const data = await mammoth.extractRawText(buffer);
      
      results.push({
        name: file.name,
        text: data.value,
      });
    }
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
      if(value.test(line.trim())) {
        currentSection = key;
        if(!result.sections[currentSection]){
        result.sections[currentSection] = [];
      }
       isSectionHeader = true;
       break;
      }
    }
    if(!isSectionHeader && currentSection) {
      result.sections[currentSection].push(line);
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
