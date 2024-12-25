import { Toast } from 'flowbite-react';
import { CiCircleCheck } from 'react-icons/ci';
import { MdErrorOutline } from 'react-icons/md';

export const Toaster = (prop) => {
  const { showToast, setShowToast, isStatus } = prop;

  if (!showToast) return null;

  if (isStatus) {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <>
      {showToast && (
        <div className="absolute z-[999] left-1/2 transform -translate-x-1/2 top-5">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              {isStatus.type === 'success' ? (
                <CiCircleCheck className="text-emerald-600" />
              ) : (
                <MdErrorOutline className="text-red-600" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{isStatus.message}</div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};
