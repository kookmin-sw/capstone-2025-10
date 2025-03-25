"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const ImageUploader = () => {
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
        // TODO: File Upload API 연동
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUploading(false);
            }
        }, 500); // 0.5초마다 10% 증가
    };

    return (
        <div className={styles.uploadContainer}>
            {file ? (
                isUploading ? (
                    <div className={styles.uploading}>
                        <div className={styles.progressContainer}>
                            <svg width="68" height="68" viewBox="0 0 80 80">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r={34}
                                    fill="transparent"
                                    stroke="#d9d9d9"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r={34}
                                    fill="transparent"
                                    stroke="#004BD6"
                                    strokeWidth="8"
                                    strokeDasharray={2 * Math.PI * 34}
                                    strokeDashoffset={(2 * Math.PI * 34) - (uploadProgress / 100) * (2 * Math.PI * 34)}
                                    strokeLinecap="round"
                                    transform="rotate(-90 40 40)"
                                />
                            </svg>
                            <p>{uploadProgress}%</p>
                        </div>
                        <p>파일 업로드 중</p>
                    </div>
                ) : (
                    <div className={styles.preview}>
                        <img src={URL.createObjectURL(file)} alt="Uploaded Preview"/>
                    </div>
                )
            ) : (
                <label className={styles.uploadLabel}>
                    <input type="file" onChange={handleFileChange} hidden/>
                    <div className={styles.uploadBox}>
                        <div>
                            <Image
                                src="/upload-icon.svg"
                                width={68}
                                height={68}
                                alt={"upload"}
                            />
                        </div>
                        <p>이미지를 업로드해주세요</p>
                    </div>
                </label>
            )}
        </div>
    );
};

export default ImageUploader;
