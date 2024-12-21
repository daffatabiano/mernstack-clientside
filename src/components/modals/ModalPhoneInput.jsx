import { useNavigate } from 'react-router-dom';
import { styles } from '../../helper/styles';
import ModalCard from './Card';
import ModalWrapper from './Wrapper';
import { useState } from 'react';
import useAction from '../../hooks/useAction';

export default function ModalPhoneInput() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isCode, setIsCode] = useState('');

  const { sendOtp, verifyOtp } = useAction();

  const handleSendOtp = () =>
    sendOtp(phone)
      .then((res) => {
        if (res.status === 200) setIsValid(true);
      })
      .catch((err) => console.log(err));

  return (
    <ModalWrapper>
      <ModalCard>
        {isValid ? (
          <div>
            <h1>Your phone number is {phone}</h1>
            <input
              type="text"
              onChange={(e) => setIsCode(e.target.value)}
              value={isCode}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1 className={`${styles.fontTitle}`}>Input Your Number Phone</h1>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="+62 xxx"
                className={styles.input}
                value={phone}
              />
            </div>
            <button className={styles.button} onClick={handleSendOtp}>
              Send
            </button>
          </>
        )}
      </ModalCard>
    </ModalWrapper>
  );
}
