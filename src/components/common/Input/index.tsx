import styles from "./Input.module.css";

interface Props {
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, placeholder, type = "text", onChange }: Props) => {
  return (
    <input
      className={styles.input}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
