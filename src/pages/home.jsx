import { useEffect, useState } from 'react';
import { FaKey, FaLock, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [unlock, setUnlock] = useState(false);
  const [section, setSection] = useState(1);
  const navigate = useNavigate();
  const key = localStorage.getItem('key');
  const token = localStorage.getItem('token');
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);

  useEffect(() => {
    if (isIntroPlaying) {
      const timer = setTimeout(() => {
        setIsIntroPlaying(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isIntroPlaying]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (key) {
      navigate('/menu');
    }
  }, [key, navigate]);

  return (
    <>
      {isIntroPlaying ? (
        <div className="min-w-screen min-h-screen md:w-1/2 md:h-1/2 transition-all transform duration-300 w-full h-full flex justify-center items-center flex-col">
          <video
            autoPlay
            loop
            muted
            onEnded={() => setIsIntroPlaying(false)}
            className="w-full h-full">
            <source src="/videos/opening.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
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
