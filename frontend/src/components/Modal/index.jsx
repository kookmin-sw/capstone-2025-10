import styles from "./index.module.scss";
import Image from "next/image";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <Image
                        src="/close-icon.svg"
                        alt="close icon"
                        width={20}
                        height={20}
                    />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
