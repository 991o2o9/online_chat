import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './Chat.module.scss';
import { BASE_URL, path } from 'Utils/Constants/Constants';
import { Messages } from './Components/Messages/Messages';
import { Form } from './Components/Form/Form';

export const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: '', user: '' });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [socket] = useState(() => io(`${BASE_URL}`));

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
      <Messages params={params} state={state} />
      <Form
        handleSubmit={handleSubmit}
        message={message}
        handleChange={handleChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};
