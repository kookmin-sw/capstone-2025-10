"use client";

import styles from "./index.module.scss";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Textarea from "@/components/Input/Textarea";
import useImageUpload from "@/hooks/useImageUpload";
import {
  createProduct,
  deleteProduct,
  getProductByDashboardId,
  updateProduct,
} from "@/lib/api/product";

const shallowEqual = (a, b) => Object.keys(a).every((key) => a[key] === b[key]);

const compareWith = (base) => (target) => shallowEqual(base, target);

const initProduct = {
  id: "",
  name: "",
  price: "",
  description: "",
  imageUrl: null,
};

const ProductCard = ({ mode = "edit", dashboardId }) => {
  const [products, setProducts] = useState([]);
  const [focusProduct, setFocusProduct] = useState(initProduct);
  const [originalProduct, setOriginalProduct] = useState(initProduct);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const isReadOnly = mode === "read";
  const upload = useImageUpload();

  const isEmpty = compareWith(initProduct)(focusProduct);
  const isChanged = !compareWith(originalProduct)(focusProduct);

  const onCancelClick = () => {
    setFocusProduct(initProduct);
    upload.setFile("");
  };

  const onDeleteClick = async (id) => {
    const response = await deleteProduct(id);
    console.log(response);
    setShouldRefresh(true);
  };

  const onSubmitClick = async () => {
    if (focusProduct.id) {
      await updateProduct(focusProduct.id, focusProduct);
    } else {
      await createProduct(dashboardId, focusProduct);
    }
    setShouldRefresh(true);
    setFocusProduct(initProduct);
    upload.setFile("");
  };

  useEffect(() => {
    setShouldRefresh(true);
  }, []);

  useEffect(() => {
    console.log("refresh");
    if (!shouldRefresh) {return;}

    const getProduct = async () => {
      const response = await getProductByDashboardId(dashboardId);
      console.log(response);
      setProducts(response);
      setShouldRefresh(false);
    };
    getProduct();
  }, [shouldRefresh]);

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
  }, [focusProduct?.imageUrl]);

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles["step-badge"]}>STEP 3</span>
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
            <Button
              disabled={!isChanged}
              onClick={(e) => {
                e.preventDefault();
                onSubmitClick();
              }}
            >
              저장
            </Button>
          </div>
        )}
      </div>
      <div className={styles["list-wrapper"]}>
        {products.map((product, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "1px solid #E8E8E8",
                borderRadius: "10px",
              }}
              onClick={(e) => {
                e.preventDefault();
                setFocusProduct(product);
                setOriginalProduct(product); // 초기값 저장
              }}
            >
              <p>
                {product.name} | {product.price}원
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteClick(product.id);
                }}
              >
                <img src="/x.svg" alt="delete button" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
