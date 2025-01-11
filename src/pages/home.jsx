import { useEffect, useState } from 'react';
import { FaKey, FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styles } from '../helper/styles';

export default function Home() {
  const [unlock, setUnlock] = useState(false);
  const [section, setSection] = useState(1);
  const navigate = useNavigate();
  const tokenCust = localStorage.getItem('tokenCust');
  const customer = JSON.parse(localStorage.getItem('customer'));
  const tableId = localStorage.getItem('tableId');
  const voucherCheck = customer?.voucher?.length > 0 ? true : false;
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [sectionPlayer, setSectionPlayer] = useState(1);

  useEffect(() => {
    if (!tokenCust) {
      navigate('/otp');
    }
  }, [tokenCust, navigate]);

  return (
    <>
      {isIntroPlaying && (
        <div className="min-w-screen min-h-screen m-auto md:w-1/2 md:h-1/2 transition-all transform duration-300 w-full h-full flex justify-center items-center flex-col">
          {sectionPlayer === 1 ? (
            <video
              autoPlay
              onEnded={() =>
                setSectionPlayer((sectionPlayer) => sectionPlayer + 1)
              }
              className="w-full h-full">
              <source src="/videos/opening.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full flex flex-col gap-2 p-4 justify-center items-center bg-slate-200 text-black rounded-lg animate-scale-in">
              <div className="flex flex-col gap-2 place-items-center">
                <p className="text-sm">Currently you are in</p>
                <h4 className="text-xl">Table</h4>
                <h1 className="text-3xl text-semibold">
                  <span className="text-sky-500 !text-[12px]">No.</span>
                  {tableId}
                </h1>
              </div>
              <p className=" animate-fade-in delay-1000">
                Hello {customer.name || customer.email || customer.phone},
                Welcome to our Restaurant
              </p>
              <div className=" animate-fade-in delay-1500 flex flex-col gap-1">
                <p
                  className={`text-sm ${
                    voucherCheck ? 'text-emerald-500' : 'text-slate-500'
                  } `}>
                  {voucherCheck
                    ? 'You have a new voucher'
                    : 'click the button below to go to the menu'}
                </p>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => {
                    if (voucherCheck) {
                      setIsIntroPlaying(false);
                    } else {
                      navigate('/menu');
                    }
                  }}>
                  <span className="animate-fade-in delay-2000">
                    {voucherCheck ? 'Claim Voucher' : 'Go to Menu'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {voucherCheck && (
        <>
          <div className="min-w-screen min-h-screen transition-all transform duration-300 w-full h-full p-2 bg-gradient-to-r from-sky-900 to-sky-600 flex justify-center items-center flex-col">
            {section === 1 && (
              <>
                <div className="flex flex-col justify-center items-center gap-4">
                  <img
                    src="/images/chest-close.png"
                    alt=""
                    className={`${
                      unlock && 'animate-[wiggle_1s_ease-in-out_infinite]'
                    } w-60 h-60`}
                  />
                  <p className="text-2xl italic  text-white font-bold">
                    Help , Me please !
                  </p>
                </div>
                <div className="w-full md:w-1/3">
                  <button
                    type="button"
                    disabled={!unlock}
                    onClick={() => setSection(2)}
                    className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 ${
                      !unlock &&
                      'cursor-not-allowed bg-slate-100 text-amber-400 opacity-50'
                    }`}>
                    {unlock ? 'Open the Chest' : 'Take the key'}
                  </button>
                </div>
              </>
            )}

            {section === 2 && (
              <>
                <div className="flex flex-col justify-center items-center gap-4">
                  <img
                    src="/images/chest-open.png"
                    alt=""
                    className={`${
                      unlock && 'animate-[wiggle_1s_ease-in-out_infinite]'
                    } w-60 h-60`}
                  />
                  <p className="text-2xl italic text-white font-bold">
                    Congratulations !
                  </p>
                </div>
                <div className="w-full md:w-1/3">
                  <button
                    type="button"
                    onClick={() => setSection(3)}
                    className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 `}>
                    Claim Special Price
                  </button>
                </div>
              </>
            )}

            {section === 3 && (
              <>
                <div className="flex flex-col justify-center items-center gap-4">
                  <img
                    src="/images/discount.png"
                    alt=""
                    className="w-60 h-60 animate-[jump-in_1s_ease-in-out_infinite]"
                  />
                  <p className="text-2xl italic text-white font-bold">
                    enjoy your discount !
                  </p>
                </div>
                <div className="w-full md:w-1/3">
                  <button
                    type="button"
                    disabled={!unlock}
                    onClick={() => {
                      navigate('/menu');
                      localStorage.setItem('key', 'true');
                    }}
                    className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 `}>
                    Get Special Price 💸
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-10 right-0 left-0 flex gap-4 justify-center items-center">
            <span
              onClick={() => setSection(1)}
              className={` rounded-full p-2 ${
                section === 1 ? 'bg-slate-800/90' : 'bg-slate-800/50'
              } w-2 h-2`}
            />
            <span
              onClick={() => {
                if (section !== 1 || unlock) {
                  setSection(2);
                }
              }}
              disabled={section === 1}
              className={` rounded-full p-2  ${
                section === 2 ? 'bg-slate-800/90' : 'bg-slate-800/50'
              } w-2 h-2`}
            />
            <span
              onClick={() => {
                if (section !== 1 || unlock) {
                  setSection(3);
                }
              }}
              disabled={section === 1}
              className={` rounded-full p-2 ${
                section === 3 ? 'bg-slate-800/90' : 'bg-slate-800/50'
              } w-2 h-2`}
            />
          </div>
          {section === 1 && (
            <>
              <div className="absolute top-5 right-5">
                <i
                  onClick={() => setUnlock(!unlock)}
                  className={`text-2xl text-amber-300`}>
                  <FaKey />
                </i>
              </div>
              <div className="absolute top-20 left-0 right-0 flex justify-center">
                <i className="text-4xl text-white p-4 border-2 rounded-full border-white">
                  {unlock ? <FaUnlock /> : <FaLock />}
                </i>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
