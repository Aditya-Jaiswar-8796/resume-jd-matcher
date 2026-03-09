import React from 'react'

const preview = () => {
  return (
    <div>
      {preview && (
          <embed className="z-10 border-4 mr-10 mt-4 max-h-108 border-cyan-500 rounded-lg shadow-lg"
            src={pdfUrl}
            type={`application/pdf`}
            width="800px"
            height="450px"
          />
        )}
    </div>
  )
}

export default preview
