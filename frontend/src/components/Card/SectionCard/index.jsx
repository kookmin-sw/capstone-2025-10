"use client";

import React, {useState} from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";
import {useModal} from "@/contexts/ModalContext";
import TextInput from "@/components/Input/TextInput";

const SectionCard = ({sections, setSections, image}) => {
    const {openModal, closeModal} = useModal();
    const [focusIndex, setFocusIndex] = useState(null);

    const handleAddSection = (e) => {
    };

    const handleSave = (name) => {
    }

    const handleUpdate = (e) => {
    }

    const handleDeleteSection = (index) => {
    };

    return (
        <div className={styles["upload-card"]}>
            <div className={styles["image-grid-wrapper"]}>
                {image && <img src={URL.createObjectURL(image)} alt="Uploaded Preview"/>}
                <ImageGrid
                    sections={sections}
                />
            </div>
            <div className={styles["right-wrapper"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["button-wrapper"]}>
                    {
                        focusIndex === null ? <Button onClick={handleAddSection}>Add Section</Button> :
                            <Button onClick={handleUpdate}>Save</Button>
                    }
                </div>
                <div className={styles["list-wrapper"]}>
                    {sections.map((section, idx) => {
                        return (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: section.color,
                                    border: idx === focusIndex ? "1px solid #000" : ""
                                }}
                            >
                                <input
                                    value={section.name}
                                    onChange={(e) => {
                                        e.preventDefault()
                                    }}
                                    disabled={idx !== focusIndex}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDeleteSection(idx)
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const ImageGrid = ({sections}) => {
    return (
        <div className={styles.grid}>
            {Array.from({length: 100}).map((_, index) => {
                const section = sections.find((s) => s.cells.includes(index));
                const backgroundColor = section?.color || "transparent";

                return <div
                    key={index}
                    className={styles["grid-cell"]}
                    style={{backgroundColor}}
                />
            })}
        </div>
    );
};

const SectionNameCard = ({onSave}) => {
    const [name, setName] = useState();

    return <div className={styles["section-name-card"]}>
        <TextInput onChange={(e) => setName(e.target.value)} label="섹션 이름" placeholder="섹션 이름을 입력하세요"/>
        <Button
            onClick={(e) => {
                e.preventDefault()
                onSave(name)
            }}
        >SAVE</Button>
    </div>
}

export default SectionCard;
