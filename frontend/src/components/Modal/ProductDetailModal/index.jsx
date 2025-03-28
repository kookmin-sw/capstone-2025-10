import styles from "./index.module.scss";
import TextInput from "@/components/Input/TextInput";
import ImageUploader from "@/components/Input/ImageUploader";
import Button from "@/components/Button";

const ProductCard = ({mode = "edit", onClose, product = {}, onSubmit}) => {
    const isReadOnly = mode === "read";

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h2>{mode === "read" ? "등록된 상품 조회하기" : "등록된 상품 수정하기"}</h2>
            </div>

            <div className={styles.content}>
                <div className={styles["image-wrapper"]}>
                    <ImageUploader/>
                </div>

                <div className={styles["input-group"]}>
                    <TextInput label="상품명" placeholder={"상품명을 입력해주세요."} disabled={mode === "read"} value={product.name} />
                    <TextInput label="가격" placeholder={"상품명을 입력해주세요."} disabled={mode === "read"} value={product.price} />
                    <TextInput label="상품설명" placeholder={"상품명을 입력해주세요."} disabled={mode === "read"} value={product.description} />
                </div>
            </div>

            {!isReadOnly && (
                <div className={styles.footer}>
                    <Button disabled={true}>저장</Button>
                </div>
            )}
        </div>
    );
};


export default ProductCard;
