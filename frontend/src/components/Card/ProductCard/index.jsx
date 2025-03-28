"use client"

import styles from "./index.module.scss";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";
import Button from "@/components/Button";
import React, {useState} from "react";
import Textarea from "@/components/Input/Textarea";

const ProductCard = ({mode = "edit", onClose, products = {}, onSubmit}) => {
    const [product, setProduct] = useState({})
    const [focusIndex, setFocusIndex] = useState(null)
    const isReadOnly = mode === "read";

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles["step-badge"]}>STEP 2</span>
                    <h3 className={styles["title"]}>상품 관리</h3>
                </div>
                <div className={styles["image-wrapper"]}>
                    <div className={styles["upload-wrapper"]}>
                        <ImageUploader/>
                    </div>
                    <div className={styles["input-group"]}>
                        <TextInput label="상품명" placeholder={"상품명을 입력해주세요."} disabled={mode === "read"}
                                   value={product.name}/>
                        <TextInput label="가격" placeholder={"가격을 입력해주세요."} disabled={mode === "read"}
                                   value={product.price}/>
                    </div>
                </div>

                <div style={{flex: 1}} className={styles["input-group"]}>
                    <Textarea label="상품 설명" placeholder={"상품 설명을 입력해주세요."} disabled={mode === "read"}
                               value={product.description}/>
                </div>

                {!isReadOnly && (
                    <div className={styles.submit}>
                        <Button variant="cancel">취소</Button>
                        <Button disabled={true}>저장</Button>
                    </div>
            )}
            </div>
            <div className={styles["list-wrapper"]}>
                {products.map((section, idx) => {
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
                                }}
                            >
                                삭제
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default ProductCard;
