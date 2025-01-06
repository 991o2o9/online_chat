import { Input } from 'Ui/Input/Input';
import styles from './Form.module.scss';
import EmojiPicker from 'emoji-picker-react';

export const Form = ({
  handleSubmit,
  message,
  handleChange,
  isOpen,
  setIsOpen,
  onEmojiClick,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Input
          name="message"
          value={message}
          placeholder="Ваше сообщение"
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className={styles.emoji}>
        <i onClick={() => setIsOpen(!isOpen)}>Emoji</i>
        {isOpen && (
          <div className={styles.emo}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <div className={styles.btn}>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};
