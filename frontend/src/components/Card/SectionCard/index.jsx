"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";
import { useModal } from "@/contexts/ModalContext";
import {
  getProductByDashboardId,
  getProductBySectionId,
  matchProductWithSection,
} from "@/lib/api/product";

const ImageGrid = dynamic(() => import("@/components/ImageGrid"), {
  ssr: false,
});

const SectionCard = ({ sections, setSections, image, dashboardId }) => {
  const { openModal, closeModal } = useModal();
  const [focusIndex, setFocusIndex] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (focusIndex !== null) {
      getProducts();
    }
  }, [focusIndex]);

  const getProducts = async () => {
    const response = await getProductBySectionId(sections[focusIndex]?.id);
    setProducts(response);
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    const response = await getDashboardProducts();
    openModal(
      <ProductList
        dashboardId={dashboardId}
        products={response}
        onSave={(focusIndex) => onMatchClick(focusIndex)}
      />,
    );
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

  const getDashboardProducts = async () => {
    return await getProductByDashboardId(dashboardId);
  };

  const onMatchClick = async (productId) => {
    await matchProductWithSection(productId, sections[focusIndex].id);
    await getProducts();
    closeModal();
  };
  function updateHSLAAlpha(hslaStr, newAlpha) {
    return hslaStr.replace(
      /hsla\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/,
      `hsla($1, $2, $3, ${newAlpha})`,
    );
  }

  return (
    <div className={styles["upload-card"]}>
      <div>
        <h3 style={{ marginBottom: "12px" }} className={styles.title}>
          <span className={styles["step-badge"]}>STEP 4</span>
          상품 배치
        </h3>
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
      </div>
      <div
        className={styles["right-wrapper"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["button-wrapper"]}>
          <Button onClick={handleAddSection}>Add Product</Button>
        </div>
        <div
          className={styles["list-wrapper"]}
          style={{
            backgroundColor: sections[focusIndex]?.color
              ? updateHSLAAlpha(sections[focusIndex]?.color, 0.1)
              : "#FAFAFA",
          }}
        >
          {products.map((product, idx) => {
            return (
              <div
                key={idx}
                style={{
                  border: idx === "1px solid #000",
                }}
              >
                {product.name}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteSection(idx);
                  }}
                >
                  <img src="/x.svg" alt="delete button" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products, onSave }) => {
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

      <div style={{ display: "flex", justifyContent: "right", width: "100%" }}>
        <Button
          onClick={() => onSave(products[Array.from(selectedIndex)[0]].id)}
        >
          Save
        </Button>
      </div>
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
