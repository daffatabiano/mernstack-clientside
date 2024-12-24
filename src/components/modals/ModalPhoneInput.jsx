import { useNavigate } from 'react-router-dom';
import { styles } from '../../helper/styles';
import ModalCard from './Card';
import ModalWrapper from './Wrapper';
import { useState } from 'react';
import useAction from '../../hooks/useAction';

export default function ModalPhoneInput() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isCode, setIsCode] = useState('');
  const [isOpenInput, setIsOpenInput] = useState({
    isEmail: {
      shown: false,
      value: '',
    },
    isPhone: {
      shown: false,
      value: '',
    },
  });

  const { sendOtp, verifyOtp } = useAction();

  const handleSendOtp = () => {
    if (isOpenInput.isEmail.shown) {
      sendOtp({
        email: isOpenInput.isEmail.value,
        method: 'email',
      })
        .then((res) => {
          if (res.status === 200) setIsValid(true);
        })
        .catch((err) => console.log(err));
    } else if (isOpenInput.isPhone.shown) {
      sendOtp({
        phone: isOpenInput.isPhone.value,
        method: 'sms',
      })
        .then((res) => {
          if (res.status === 200) setIsValid(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleVerifyOtp = () => {
    if (isCode.length === 6) {
      if (isOpenInput.isEmail.shown) {
        verifyOtp({
          email: isOpenInput.isEmail.value,
          otp: isCode,
        })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('user', JSON.stringify(res.data.user));
              navigate('/home');
            }
          })
          .catch((err) => console.log(err));
      } else if (isOpenInput.isPhone.shown) {
        verifyOtp({
          phone: isOpenInput.isPhone.value,
          otp: isCode,
        })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('user', JSON.stringify(res.data.user));
              navigate('/home');
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert('OTP must be 6 digits');
    }
  };

  return (
    <ModalWrapper>
      <ModalCard>
        {isValid ? (
          <div>
            <h1>
              {' '}
              Hi Your{' '}
              {isOpenInput.isEmail.shown
                ? `Email is ${isOpenInput.isEmail.value}`
                : `Phone is ${isOpenInput.isPhone.value}`}
            </h1>
            <input
              type="text"
              onChange={(e) => setIsCode(e.target.value)}
              value={isCode}
              className={styles.input}
            />
            <button
              type="button"
              className={`${styles.button}`}
              onClick={handleVerifyOtp}>
              Verify
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1 className={`${styles.fontTitle}`}>Input Your Number Phone</h1>
              <div
                className={
                  isOpenInput.isPhone.shown || isOpenInput.isEmail.shown
                    ? 'hidden'
                    : 'flex flex-col gap-2 text-center'
                }>
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() =>
                    setIsOpenInput({
                      ...isOpenInput,
                      isPhone: { shown: true, value: '' },
                    })
                  }>
                  Phone Number
                </button>
                or
                <button
                  type="button"
                  className={`${styles.button}`}
                  onClick={() =>
                    setIsOpenInput({
                      ...isOpenInput,
                      isEmail: { shown: true, value: '' },
                    })
                  }>
                  Email
                </button>
              </div>
              {isOpenInput.isEmail.shown && (
                <input
                  onChange={(e) =>
                    setIsOpenInput({
                      ...isOpenInput,
                      isEmail: { shown: true, value: e.target.value },
                    })
                  }
                  type="email"
                  placeholder="example@mail.com"
                  className={styles.input}
                />
              )}
              {isOpenInput.isPhone.shown && (
                <input
                  onChange={(e) =>
                    setIsOpenInput({
                      ...isOpenInput,
                      isPhone: { shown: true, value: e.target.value },
                    })
                  }
                  type="number"
                  placeholder="+62 xxx"
                  className={styles.input}
                />
              )}
            </div>
            <button
              type="button"
              className={`${styles.button} ${
                isOpenInput.isEmail.shown || isOpenInput.isPhone.shown
                  ? ''
                  : 'hidden'
              }`}
              onClick={handleSendOtp}>
              Send Otp
            </button>
          </>
        )}
      </ModalCard>
    </ModalWrapper>
  );
}
