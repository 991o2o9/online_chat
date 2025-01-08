import { Input } from 'Ui/Input/Input';
import styles from './Form.module.scss';
import EmojiPicker from 'emoji-picker-react';
import emoji from '../../../../Assets/Img/emoji.png';
import { useOutsideClick } from 'Utils/Hooks/useOutsideClick';
import { IoMdSend } from 'react-icons/io';

export const Form = ({
  handleSubmit,
  message,
  handleChange,
  isOpen,
  setIsOpen,
  onEmojiClick,
}) => {
  const ref = useOutsideClick(() => setIsOpen(false));
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Input
          className={styles.input}
          name="message"
          value={message}
          placeholder="Ваше сообщение"
          onChange={handleChange}
          required={true}
        />
        <div className={styles.sendPlace}>
          <div ref={ref} className={styles.emoji}>
            <img src={emoji} alt="emoji" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className={styles.emo}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <div className={styles.btn}>
            <IoMdSend className={styles.sendBtn} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </form>
  );
};
