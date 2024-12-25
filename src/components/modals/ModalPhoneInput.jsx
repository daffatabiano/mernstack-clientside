import { useNavigate, useSearchParams } from 'react-router-dom';
import { styles } from '../../helper/styles';
import ModalCard from './Card';
import ModalWrapper from './Wrapper';
import { useEffect, useState } from 'react';
import useAction from '../../hooks/useAction';

export default function ModalPhoneInput() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isCode, setIsCode] = useState('');
  const [countdownOtp, setCountdownOtp] = useState(300);
  const queryTableId = localStorage.getItem('tableId');
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
              navigate('/menu/tableId=');
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
            <h1 className="text-xl text-indigo-500 p-2 bg-indigo-500/10 rounded-lg">
              {' '}
              Hi{' '}
              {isOpenInput.isEmail.shown
                ? `${isOpenInput.isEmail.value}`
                : `${isOpenInput.isPhone.value}`}
              ,
            </h1>
            <p className="text-sm p-2">
              {' '}
              we&apos;ve sent you a otp code into your{' '}
              {isOpenInput.isEmail.shown ? 'email' : 'phone'} , please check it.
            </p>
            <input
              type="text"
              onChange={(e) => setIsCode(e.target.value)}
              value={isCode}
              className={styles.input}
              placeholder="OTP Code"
            />
            <button
              type="button"
              className={`${styles.button}`}
              onClick={handleVerifyOtp}>
              Verify
            </button>
            <button
              type="link"
              className="text-indigo-500 text-sm text-center hover:text-indigo-600 w-full"
              onClick={handleSendOtp}>
              Resend OTP
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1
                className={`${
                  styles.fontTitle
                } !text-slate-500 text-center !text-lg ${
                  isOpenInput.isEmail.shown || isOpenInput.isPhone.shown
                    ? 'block'
                    : 'hidden'
                }`}>
                {isOpenInput.isEmail.shown ? 'Email' : 'Phone Number'}
              </h1>
              <h1
                className={`py-2 text-center font-bold text-indigo-500 ${
                  isOpenInput.isEmail.shown || isOpenInput.isPhone.shown
                    ? 'hidden'
                    : 'block'
                }`}>
                Choose Verification OTP methods
              </h1>
              <hr />
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
                <i className="text-indigo-500">~OR~</i>
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
              className={`${styles.button}  ${
                isOpenInput.isEmail.shown || isOpenInput.isPhone.shown
                  ? ''
                  : 'hidden'
              }`}
              onClick={handleSendOtp}>
              Send Otp
            </button>
            <button
              type="link"
              className={`text-center text-sm text-slate-500 w-full ${
                isOpenInput.isEmail.shown || isOpenInput.isPhone.shown
                  ? ''
                  : 'hidden'
              }`}
              onClick={() =>
                isOpenInput.isEmail.shown
                  ? setIsOpenInput({
                      ...isOpenInput,
                      isPhone: { shown: true },
                      isEmail: { shown: false },
                    })
                  : setIsOpenInput({
                      ...isOpenInput,
                      isPhone: { shown: false },
                      isEmail: { shown: true },
                    })
              }>
              {isOpenInput.isEmail.shown ? 'number phone' : 'email'}
            </button>
          </>
        )}
      </ModalCard>
    </ModalWrapper>
  );
}
