import styles from './Input.module.scss';

export const Input = ({
  type = 'text',
  placeholder = 'Type here...',
  onChange,
  className = '',
  required = false,
  textArea = false,
  name,
  value,
  autoComplete = 'off',
  ...props
}) => {
  return textArea ? (
    <textarea
      placeholder={placeholder}
      className={`${styles.textarea} ${className}`}
      required={required}
      onChange={onChange}
      name={name}
      value={value}
      autoComplete={autoComplete}
      {...props}
    />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      required={required}
      onChange={onChange}
      name={name}
      value={value}
      autoComplete={autoComplete}
      {...props}
    />
  );
};
