import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { PassThrough } from "stream";

export async function POST(req) {
  const { results } = await req.json();

  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });

  const stream = new PassThrough();
  const chunks = [];

  doc.pipe(stream);

  stream.on("data", chunk => chunks.push(chunk));

  stream.on("end", () => {
    console.log("PDF stream ended");
  });

  doc.fontSize(18).text("Resume Screening Report");
  doc.text('');
  doc.text(results[0] && `Job Title: ${results[0].jobTitle}`);
  doc.text(`Generated on: ${new Date().toLocaleString()}`);
  doc.text(`Total Candidates: ${results.length}`);
  doc.text('----------------------------------------');
  doc.moveDown();

  results.forEach((r, i) => {
    doc.fontSize(12).text(`${i + 1}. ${r.name}`);
    doc.text(`Score: ${r.totalscore}%`);
    doc.text(`Matched Skills: ${r.totalSkills.matchedSkills.join(", ")}`);
    doc.text(`Missing Skills: ${r.totalSkills.unMatchedSkills.join(", ")}`);
    doc.text(`Experience: ${r.expyears} years (Score: ${r.experience}/20.00)`);
    doc.moveDown();
  });

  doc.end();

  await new Promise(resolve => stream.on("end", resolve));

  const pdfBuffer = Buffer.concat(chunks);

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=screening-report.pdf"
    }
  });
}
