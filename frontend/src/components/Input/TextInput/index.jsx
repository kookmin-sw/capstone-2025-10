import styles from "./index.module.scss";

const TextInput = ({ label, type = "text", placeholder, value, onChange, disabled = false }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
