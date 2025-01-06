import { Typography } from 'Ui/Typography/Typography';
import styles from './Messages.module.scss';

export const Messages = ({ state, params }) => {
  return (
    <div className={styles.messages}>
      {state.map((msg, index) => {
        const currentUser = params.name.trim().toLowerCase();
        const userName =
          typeof msg.user === 'object' ? msg.user.name : msg.user;
        const itsMe =
          params.name && currentUser === userName.trim().toLowerCase();

        const className = itsMe ? styles.me : styles.user;
        return (
          <div className={`${styles.message} ${className}`} key={index}>
            <Typography weight="500">{userName}</Typography>
            <div className={styles.text}>
              <Typography size="L">{msg.message}</Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};
