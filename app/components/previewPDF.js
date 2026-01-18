'use client';
import { useEffect, useState } from "react";

function PdfPreview() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="50%"
          height="600px"
        />
      )}
    </>
  );
}

export default PdfPreview;
