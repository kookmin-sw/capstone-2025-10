"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";
import { useModal } from "@/contexts/ModalContext";
import ImageGrid from "@/components/ImageGrid";
import { getProductBySectionId } from "@/lib/api/product";

const SectionCard = ({ sections, setSections, image }) => {
  const { openModal, closeModal } = useModal();
  const [focusIndex, setFocusIndex] = useState(null);

  useEffect(() => {
    if (focusIndex !== null) getProductBySectionId(sections[focusIndex]?.id);
  }, [focusIndex]);

  const handleAddSection = (e) => {
    e.preventDefault();
    openModal(<ProductList />);
  };

  const handleSave = (name) => {};

  const handleUpdate = (e) => {};

  const handleDeleteSection = (index) => {};

  const onSectionClick = (index) => {
    sections.map((section, sectionIndex) => {
      console.log(section);
      if (section.cells.includes(index)) {
        setFocusIndex(sectionIndex);
      }
    });
  };

  return (
    <div className={styles["upload-card"]}>
      <div className={styles["image-grid-wrapper"]}>
        {image && (
          <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
        )}
        <ImageGrid
          sections={sections}
          handleMouseClick={onSectionClick}
          focusIndex={focusIndex}
          selected={new Set(sections[focusIndex]?.cells)}
        />
      </div>
      <div
        className={styles["right-wrapper"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["button-wrapper"]}>
          <Button onClick={handleAddSection}>Add Product</Button>
        </div>
        <div className={styles["list-wrapper"]}>
          {sections.map((section, idx) => {
            return (
              <div
                key={idx}
                style={{
                  border: idx === "1px solid #000",
                }}
              >
                {section.name}
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
    </div>
  );
};

const ProductList = () => {
  const [selectedIndex, setSelectedIndex] = useState(new Set());
  const toggleSelect = (index) => {
    setSelectedIndex((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // 선택 해제
      } else {
        newSet.add(index); // 선택 추가
      }
      return newSet;
    });
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "여름 샌들",
      price: 39000,
      dashboardId: 3,
      sectionId: null,
      description: "통풍 잘 되는 여름 샌들입니다.",
      imageUrl: "test.png",
    },
    {
      id: 3,
      name: "여름 샌들",
      price: 39000,
      dashboardId: 3,
      sectionId: null,
      description: "통풍 잘 되는 여름 샌들입니다.",
      imageUrl: "test.png",
    },
    {
      id: 4,
      name: "여름 샌들",
      price: 39000,
      dashboardId: 3,
      sectionId: null,
      description: "통풍 잘 되는 여름 샌들입니다.",
      imageUrl: "test.png",
    },
    {
      id: 2,
      name: "여름 샌들",
      price: 39000,
      dashboardId: 3,
      sectionId: 4,
      description: "통풍 잘 되는 여름 샌들입니다.",
      imageUrl: "test.png",
    },
  ]);

  return (
    <div>
      <div className={styles.list}>
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            index={idx}
            product={product}
            isSelected={selectedIndex.has(idx)}
            onClick={() => toggleSelect(idx)}
          />
        ))}
      </div>

      <Button>Save</Button>
    </div>
  );
};

const ProductCard = ({ index, product, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <span className={styles.index}>{index + 1}.</span>
      <div className={styles.content}>
        <div className={styles.titleLine}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.price}>
            {product.price.toLocaleString()}원
          </span>
        </div>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default SectionCard;
