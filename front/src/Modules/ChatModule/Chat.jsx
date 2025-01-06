import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './Chat.module.scss';
import { Typography } from 'Ui/Typography/Typography';
import { Input } from 'Ui/Input/Input';
import EmojiPicker from 'emoji-picker-react';
import { path } from 'Utils/Constants/Constants';

export const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: '', user: '' });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [socket] = useState(() => io('http://localhost:5000'));

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);

    if (searchParams.name && searchParams.room) {
      socket.emit('join', searchParams);

      socket.on('previousMessages', (messages) => {
        if (messages) {
          setState(messages);
        }
      });

      socket.on('roomData', ({ userCount }) => {
        setUserCount(userCount);
      });

      socket.on('message', (message) => {
        console.log('New message received:', message);
        setState((prevState) => [...prevState, message]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [search, socket]);

  const leftRoom = () => {
    socket.emit('leave', params);
    setParams({ room: '', user: '' });
    setState([]);
    setUserCount(0);
    navigate(path.home);
  };

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { message, params });
      setMessage('');
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room || 'No Room Selected'}</div>
        <div className={styles.users}>{userCount} users in this room</div>
        <button className={styles.leftRoom} onClick={leftRoom}>
          Leave Room
        </button>
      </div>
      <div className={styles.messages}>
        {state.map((msg, index) => {
          const itsMe =
            params.user &&
            params.user.trim().toLowerCase() === msg.user.trim().toLowerCase();
          const className = itsMe ? styles.me : styles.user;
          return (
            <div className={`${styles.message} ${className}`} key={index}>
              <Typography>
                {typeof msg.user === 'object' ? msg.user.name : msg.user}
              </Typography>
              <div className={styles.text}>{msg.message}</div>
            </div>
          );
        })}
      </div>

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
    </div>
  );
};
