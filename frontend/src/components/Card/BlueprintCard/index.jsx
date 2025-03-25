import React from "react";
import styles from "./index.module.scss";
import ImageUploader from "@/components/Input/ImageUploader";

const BlueprintCard = () => {
    return (
        <div className={styles["upload-card"]}>
            <div style={{width: "480px", height: "480px"}}>
                <ImageUploader />
            </div>
            <div className={styles["description"]}>
                <span className={styles["step-badge"]}>STEP 1</span>
                <h3 className={styles["title"]}>도면 업로드</h3>
                <p className={styles["hint"]}>
                    서비스에서 사용될 행사 설계도 또는 도면을 업로드해주세요.<br/>
                    지원하는 파일 형식: JPG, PNG (최대 10MB)
                </p>
            </div>
        </div>
    );
};

export default BlueprintCard;
