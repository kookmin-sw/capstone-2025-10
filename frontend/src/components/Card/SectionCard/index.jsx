"use client"

import React, {useState, useRef} from "react";
import styles from "./index.module.scss";
import ImageUploader from "@/components/Input/ImageUploader";

const SectionCard = () => {
    const [selected, setSelected] = useState(new Set());
    const isDragging = useRef(false);

    const handleMouseDown = (index) => {
        isDragging.current = true;
        setSelected(new Set([index]));
    };

    const handleMouseEnter = (index) => {
        if (isDragging.current) {
            setSelected((prev) => new Set(prev).add(index));
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div className={styles["upload-card"]}>
            <div style={{width: "480px", height: "480px", position: 'relative'}} onMouseUp={handleMouseUp}>
                <ImageUploader/>
                <div className={styles.grid}>
                    {Array.from({length: 10 * 10}).map((_, index) => (
                        <div
                            key={index} className={`${styles["grid-cell"]} ${selected.has(index) ? styles["selected"] : ""}`}
                            onMouseDown={() => handleMouseDown(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionCard;
