import styles from './Typography.module.scss';

export const Typography = ({
  variant = 'p',
  children,
  className = '',
  color = '',
  align = '',
  weight = '',
  truncate = false,
  size = '',
  onClick,
  ...props
}) => {
  const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'];

  const Tag = allowedTags.includes(variant) ? variant : 'p';

  const truncateString = (str, maxLength) => {
    if (
      typeof str === 'string' &&
      typeof maxLength === 'number' &&
      str.length > maxLength
    ) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  const content =
    typeof children === 'string' && truncate
      ? truncateString(children, truncate)
      : children;

  const sizeClass = size ? styles[`body-${size}`] : '';

  return (
    <Tag
      onClick={onClick}
      className={`${styles.typography} ${styles[variant]} ${sizeClass} ${className}`}
      style={{
        color,
        textAlign: align,
        fontWeight: weight,
      }}
      {...props}
    >
      {content}
    </Tag>
  );
};
