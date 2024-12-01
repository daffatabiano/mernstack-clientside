import { FaCartPlus } from 'react-icons/fa';
import { listsMenuBar } from '../../helper/constants';
import { Link } from 'react-router-dom';

export default function LayoutMenu(prop) {
  const { children, toCategoryMenu, setShowDrawer, showDrawer, totalQuantity } =
    prop;

  return (
    <div className="min-h-screen min-w-screen overflow-hidden w-full h-full flex flex-col justify-center items-center">
      {children}
      {toCategoryMenu.closeCategory && (
        <div className="fixed  bottom-0 w-full md:w-1/2">
          <div className=" flex z-[100] justify-between w-full rounded-lg bg-indigo-500 py-1">
            {listsMenuBar.map((item, i) => {
              const { name, icon, link } = item;

              return (
                <Link
                  to={link}
                  className={` px-4 py-2 w-full bg-indigo-500 flex flex-col justify-center items-center ${
                    i === 0
                      ? 'border-r-2 border-r-white'
                      : i === listsMenuBar.length - 1
                      ? 'border-l-2 border-l-white'
                      : ''
                  }`}
                  key={name}>
                  <i className="text-2xl text-white">{icon}</i>
                </Link>
              );
            })}
          </div>

          <div
            className={`  transition-transform duration-400 absolute ${
              showDrawer
                ? 'hidden md:block bottom-3 left-1/2 -translate-x-1/2'
                : 'bottom-3 left-1/2 -translate-x-1/2'
            } `}>
            <button
              onClick={() => setShowDrawer((curr) => !curr)}
              type="button"
              className={` bg-indigo-500 rounded-full border-8 border-white text-lg relative  p-4 `}>
              <i className={` text-white`}>
                <FaCartPlus />
              </i>
              {totalQuantity > 0 && (
                <span className="absolute text-white text-xs top-0 right-0 bg-red-500 rounded-full px-1">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
