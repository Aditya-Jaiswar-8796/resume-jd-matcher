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

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
