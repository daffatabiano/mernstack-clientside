import { useState } from 'react';
import { FaKey, FaLock, FaUnlock } from 'react-icons/fa';

export default function Home() {
  const [unlock, setUnlock] = useState(false);
  const [section, setSection] = useState(1);

  return (
    <>
      <div className="min-w-screen min-h-screen transition-all transform duration-300 w-full h-full p-2 bg-indigo-500 flex justify-center items-center flex-col">
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
              <p className="text-2xl text-white font-bold">
                Welcome To Food App !
              </p>
            </div>
            <div className="w-full">
              <button
                type="button"
                disabled={!unlock}
                onClick={() => setSection(2)}
                className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 ${
                  !unlock &&
                  'cursor-not-allowed bg-slate-100 text-amber-400 opacity-50'
                }`}>
                {unlock ? 'Get Started 🚀' : 'Take the key'}
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
              <p className="text-2xl text-white font-bold">
                Welcome To Food App !
              </p>
            </div>
            <div className="w-full">
              <button
                type="button"
                disabled={!unlock}
                onClick={() => setSection(3)}
                className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 ${
                  !unlock &&
                  'cursor-not-allowed bg-slate-100 text-amber-400 opacity-50'
                }`}>
                {unlock ? 'Get Started 🚀' : 'Take the key'}
              </button>
            </div>
          </>
        )}

        {section === 3 && (
          <>
            <div className="w-full">
              <button
                type="button"
                disabled={!unlock}
                onClick={() => setSection(4)}
                className={`w-full p-4 rounded-lg font-semibold bg-white mt-2 text-indigo-500 ${
                  !unlock &&
                  'cursor-not-allowed bg-slate-100 text-amber-400 opacity-50'
                }`}>
                {unlock ? 'Get Started 🚀' : 'Take the key'}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-10 right-0 left-0 flex gap-4 justify-center items-center">
        <span
          onClick={() => setSection(1)}
          className={` rounded-full p-2 hover:bg-slate-800/90 bg-slate-800/${
            section === 1 ? '90' : '50'
          } w-2 h-2`}
        />
        <span
          onClick={() => setSection(2)}
          className={` rounded-full p-2 hover:bg-slate-800/90 bg-slate-800/${
            section === 2 ? '90' : '50'
          } w-2 h-2`}
        />
        <span
          onClick={() => setSection(3)}
          className={` rounded-full p-2 hover:bg-slate-800/90 bg-slate-800/${
            section === 3 ? '90' : '50'
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
  );
}
