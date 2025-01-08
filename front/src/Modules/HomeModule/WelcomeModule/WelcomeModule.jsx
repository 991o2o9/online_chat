import { Container } from 'Ui/Container/Container';
import styles from './WelcomeModule.module.scss';
import { Typography } from 'Ui/Typography/Typography';
import { Input } from 'Ui/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const WelcomeModule = () => {
  const navigate = useNavigate();
  const data = {
    name: 'name',
    room: 'room',
  };
  const { name, room } = data;
  const [values, setValues] = useState({
    [name]: '',
    [room]: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleConnect = (e) => {
    e.preventDefault();
    console.log('Connecting with:', values);
    navigate(`/chat?name=${values[name]}&room=${values[room]}`);
  };

  return (
    <Container>
      <div className={styles.section}>
        <div className={styles.block}>
          <div className={styles.heading}>
            <Typography variant="h2" color="#fff">
              Join
            </Typography>
          </div>
          <form className={styles.form} onSubmit={handleConnect}>
            <div className={styles.inputs}>
              <Input
                name={'name'}
                value={values[name]}
                placeholder="Your name"
                onChange={handleChange}
                required={true}
              />
              <Input
                name={'room'}
                value={values[room]}
                placeholder="Room name"
                onChange={handleChange}
                required={true}
              />
            </div>
            <button className={styles.btn}>
              <Typography variant="h5" color="#000000">
                Connect
              </Typography>
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};
