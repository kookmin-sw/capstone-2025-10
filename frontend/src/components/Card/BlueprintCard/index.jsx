"use client";

import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import ImageUploader from "@/components/Input/ImageUploader";
import Button from "@/components/Button";
import { useModal } from "@/contexts/ModalContext";
import TextInput from "@/components/Input/TextInput";
import ImageGrid from "@/components/ImageGrid";
import { generateRandomColor } from "@/utils/sectionUtils";
import { createSection, deleteSection, updateSection } from "@/lib/api/section";

const BlueprintCard = ({ sections, setSections, upload, dashboardId }) => {
  const [selected, setSelected] = useState(new Set());
  const isDragging = useRef(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const { openModal, closeModal } = useModal();
  const [focusIndex, setFocusIndex] = useState(null);

  const handleSectionNameSave = async (name) => {
    try {
      await createSection({
        name: name,
        positionList: Array.from(selected),
        dashboardId,
      });
      handleSave(name);
      closeModal();
      focusClear();
    } catch (e) {
      closeModal();
    }
  };

  const addSelected = (index) => {
    setSelected((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  const handleMouseDown = (index) => {
    isDragging.current = true;
    addSelected(index);
  };

  const handleMouseEnter = (index) => {
    if (isDragging.current) {
      addSelected(index);
    }
  };

  const handleMouseClick = (index) => {
    //addSelected(index)
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleAddSection = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const open = () =>
      openModal(<SectionNameCard onSave={handleSectionNameSave} />);
    open();
  };

  const handleSave = (name) => {
    const newSection = {
      name: name,
      cells: Array.from(selected),
      color: generateRandomColor(),
    };
    setSections((prev) => [...prev, newSection]);
    setSelected(new Set());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSection(sections[focusIndex].id, {
        positionList: Array.from(selected),
        name: sections[focusIndex].name,
      });

      setSections((prev) =>
        prev.map((s, i) =>
          i === focusIndex ? { ...s, cells: Array.from(selected) } : s,
        ),
      );
      focusClear();
    } catch (e) {}
  };

  const handleDeleteSection = async (index) => {
    try {
      await deleteSection(sections[index].id);
      setSections((prev) => prev.filter((_, i) => i !== index));
      setSelected(new Set());
    } catch (e) {}
  };

  const handleRenameSection = (index, newName) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, name: newName } : s)),
    );
  };

  const focusClear = () => {
    setFocusIndex(null);
    setSelected(new Set());
  };

  return (
    <div
      className={styles["upload-card"]}
      onClick={(e) => {
        focusClear();
      }}
    >
      <div
        style={{ width: "480px", height: "480px", position: "relative" }}
        onMouseUp={handleMouseUp}
      >
        <ImageUploader {...upload} />
        {upload.file !== null && !upload.isUploading && (
          <ImageGrid
            selected={selected}
            sections={sections}
            focusIndex={focusIndex}
            handleMouseDown={handleMouseDown}
            handleMouseEnter={handleMouseEnter}
            handleMouseClick={handleMouseClick}
          />
        )}
      </div>
      {upload.file !== null && !upload.isUploading ? (
        <div
          className={styles["right-wrapper"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles["button-wrapper"]}>
            {focusIndex === null ? (
              <Button onClick={handleAddSection}>Add Section</Button>
            ) : (
              <Button onClick={handleUpdate}>Save</Button>
            )}
          </div>
          <div className={styles["list-wrapper"]}>
            {sections.map((section, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    border: idx === focusIndex ? "1px solid #000" : "",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setFocusIndex(idx);
                    setSelected(new Set(section.cells));
                  }}
                >
                  <input
                    value={section.name}
                    style={{
                      padding: "12px",
                      backgroundColor: section.color,
                      borderRadius: "12px",
                      width: "auto",
                    }}
                    onChange={(e) => {
                      e.preventDefault();
                      handleRenameSection(idx, e.target.value);
                    }}
                    disabled={idx !== focusIndex}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteSection(idx);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles["description"]}>
          <h3 className={styles["title"]}>
            <span className={styles["step-badge"]}>STEP 1</span>
            도면 업로드
          </h3>
          <p className={styles["hint"]}>
            서비스에서 사용될 행사 설계도 또는 도면을 업로드해주세요.
            <br />
            지원하는 파일 형식: JPG, PNG (최대 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

const SectionNameCard = ({ onSave }) => {
  const [name, setName] = useState();

  return (
    <div className={styles["section-name-card"]}>
      <TextInput
        onChange={(e) => setName(e.target.value)}
        label="섹션 이름"
        placeholder="섹션 이름을 입력하세요"
      />
      <Button
        style={{ marginLeft: "auto", marginTop: "16px" }}
        onClick={(e) => {
          e.preventDefault();
          onSave(name);
        }}
      >
        SAVE
      </Button>
    </div>
  );
};

export default BlueprintCard;
