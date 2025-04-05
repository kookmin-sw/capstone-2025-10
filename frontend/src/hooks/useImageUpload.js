"use client";

import { useState } from "react";

const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);
      }
    }, 100);
  };

  return {
    file,
    uploadProgress,
    isUploading,
    handleFileChange,
  };
};

export default useImageUpload;
