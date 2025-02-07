import { styles } from '../../helper/styles';
import { useSearchParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

export default function MenuHeader(prop) {
  const { submenu, setShownAdd, addButton = true } = prop;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center ps-1 w-full rounded-full overflow-hidden max-w-[75%] ">
      <div className=" gap-4 p-2 scrollbar-header-menu flex overflow-x-auto overflow-y-hidden">
        {submenu?.map((item) => (
          <h1
            key={item.name}
            onClick={() =>
              setSearchParams({
                category: item.name === 'All' ? '' : item.name,
              })
            }
            className={styles.submenu}>
            {item.name}
          </h1>
        ))}
      </div>
      {addButton && (
        <button
          type="button"
          className="w-fit h-fit ms-5 p-2 rounded-full flex justify-center items-center bg-base-dark text-base-light"
          onClick={() => setShownAdd(true)}>
          <FaPlus />
        </button>
      )}
    </div>
  );
}
