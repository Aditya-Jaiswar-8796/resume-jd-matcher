"use client";

import { createContext, useContext, useState } from "react";

const FileContext = createContext(null);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used inside FileProvider");
  }
  return context;
};

export default FileContext;
