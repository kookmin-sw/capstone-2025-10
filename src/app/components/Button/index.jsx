import styles from "./index.module.scss";

const Button = ({ variant = "default", size = "medium", children, ...props }) => {
    const variantClass = {
        default: styles.default,
        outline: styles.outline,
    };

    return (
        <button className={`${styles.button} ${variantClass[variant]}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
