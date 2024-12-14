import { useNavigate } from 'react-router-dom';
import { styles } from '../../helper/styles';
import ModalCard from './Card';
import ModalWrapper from './Wrapper';
import { useState } from 'react';

export default function ModalPhoneInput() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleNavigate = () => {
    localStorage.setItem('phone', phone);
    navigate('/menu');
  };

  return (
    <ModalWrapper>
      <ModalCard>
        <div className="flex flex-col gap-2">
          <h1 className={`${styles.fontTitle}`}>Input Your Number Phone</h1>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="+62 xxx"
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleNavigate}>
          Submit
        </button>
      </ModalCard>
    </ModalWrapper>
  );
}
