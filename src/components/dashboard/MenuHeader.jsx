import { CiSquarePlus } from 'react-icons/ci';
import { styles } from '../../helper/styles';

export default function MenuHeader(prop) {
  const { submenu, setShowByCategory, setShownAdd, addButton = true } = prop;

  return (
    <div className="flex items-center border-2 rounded-full overflow-hidden border-indigo-500">
      <div className="w-[90%] h-12 gap-4 p-2 scrollbar-header-menu flex overflow-x-auto overflow-y-hidden">
        {submenu.map((item) => (
          <h1
            key={item.name}
            onClick={() =>
              setShowByCategory(item.name === 'All' ? '' : item.name)
            }
            className={styles.submenu}>
            {item.name}
          </h1>
        ))}
      </div>
      {addButton && (
        <div className="w-[10%] h-12">
          <button
            type="button"
            className="w-full h-full flex justify-center items-center bg-indigo-500 text-white"
            onClick={() => setShownAdd(true)}>
            <i className="text-4xl">
              <CiSquarePlus />
            </i>
          </button>
        </div>
      )}
    </div>
  );
}
