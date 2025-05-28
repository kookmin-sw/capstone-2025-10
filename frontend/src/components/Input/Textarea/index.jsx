import styles from "./index.module.scss";

const Textarea = ({ label, placeholder, value, onChange, disabled = false }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Textarea;
