import { Typography } from 'Ui/Typography/Typography';
import styles from './Messages.module.scss';

export const Messages = ({ state, params }) => {
  return (
    <div className={styles.messages}>
      <div className={styles.content}>
        {state.map((msg, index) => {
          const currentUser = params.name.trim().toLowerCase();
          const userName =
            typeof msg.user === 'object' ? msg.user.name : msg.user;
          const itsMe =
            params.name && currentUser === userName.trim().toLowerCase();

          const className = itsMe ? styles.me : styles.user;
          const classNameForText = itsMe ? styles.myText : styles.userText;
          return (
            <div className={`${styles.message} ${className}`} key={index}>
              <Typography size="L" weight="500" className={classNameForText}>
                {!itsMe && userName}
              </Typography>
              <div className={styles.text}>
                <Typography size="L" weight="500" color="#e4e4e4">
                  {msg.message}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
