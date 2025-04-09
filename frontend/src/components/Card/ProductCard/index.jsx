"use client";

import styles from "./index.module.scss";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Textarea from "@/components/Input/Textarea";
import useImageUpload from "@/hooks/useImageUpload";

const shallowEqual = (a, b) => Object.keys(a).every((key) => a[key] === b[key]);

const compareWith = (base) => (target) => shallowEqual(base, target);

const initProduct = {
  id: "",
  name: "",
  price: "",
  description: "",
  imageUrl: null,
};

const ProductCard = ({ mode = "edit", onClose, products = {}, onSubmit }) => {
  const [focusProduct, setFocusProduct] = useState(initProduct);
  const [originalProduct, setOriginalProduct] = useState(initProduct);
  const isReadOnly = mode === "read";
  const upload = useImageUpload();

  const isEmpty = compareWith(initProduct)(focusProduct);
  const isChanged = !compareWith(originalProduct)(focusProduct);

  const onCancelClick = () => {
    setFocusProduct(initProduct);
  };

  useEffect(() => {
    if (focusProduct?.imageUrl && typeof focusProduct.imageUrl !== "object") {
      fetch(focusProduct.imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "test.png", { type: blob.type });
          upload.setFile(file);
        });
    } else {
      upload.setFile(null);
    }
  }, [focusProduct]);

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles["step-badge"]}>STEP 2</span>
          <h3 className={styles["title"]}>상품 관리</h3>
        </div>
        <div className={styles["image-wrapper"]}>
          <div className={styles["upload-wrapper"]}>
            <ImageUploader
              file={upload.file}
              isUploading={upload.isUploading}
              uploadProgress={upload.uploadProgress}
              handleFileChange={upload.handleFileChange}
            />
          </div>
          <div className={styles["input-group"]}>
            <TextInput
              label="상품명"
              placeholder={"상품명을 입력해주세요."}
              disabled={mode === "read"}
              value={focusProduct?.name}
              onChange={(e) => {
                setFocusProduct({
                  ...focusProduct,
                  name: e.target.value,
                });
              }}
            />
            <TextInput
              label="가격"
              placeholder={"가격을 입력해주세요."}
              disabled={mode === "read"}
              value={focusProduct?.price}
              onChange={(e) => {
                setFocusProduct({
                  ...focusProduct,
                  price: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1 }} className={styles["input-group"]}>
          <Textarea
            label="상품 설명"
            placeholder={"상품 설명을 입력해주세요."}
            disabled={mode === "read"}
            value={focusProduct?.description}
            onChange={(e) => {
              setFocusProduct({
                ...focusProduct,
                description: e.target.value,
              });
            }}
          />
        </div>

        {!isReadOnly && (
          <div className={styles.submit}>
            {!isEmpty && (
              <Button
                variant="cancel"
                onClick={(e) => {
                  e.preventDefault();
                  onCancelClick();
                }}
              >
                취소
              </Button>
            )}
            <Button disabled={!isChanged}>저장</Button>
          </div>
        )}
      </div>
      <div className={styles["list-wrapper"]}>
        {products.map((product, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "1px solid #000",
              }}
              onClick={(e) => {
                e.preventDefault();
                setFocusProduct(product);
                setOriginalProduct(product); // 초기값 저장
              }}
            >
              {product.name}
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
