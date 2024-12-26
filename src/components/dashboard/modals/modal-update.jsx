import { RiArrowGoBackFill } from 'react-icons/ri';
import { listsSubmenu } from '../../../helper/constants';
import { styles } from '../../../helper/styles';
import { FaCheckCircle, FaPercent } from 'react-icons/fa';
import { Toaster } from '../../notif/Toaster';

export default function ModalUpdate(prop) {
  const {
    setShowEdit,
    showEdit,
    handleEdit,
    product,
    setStatus,
    isNotify,
    setShowToast,
    showToast,
    shownInputPicture,
    setShownInputPicture,
  } = prop;

  return (
    <div
      className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
        showEdit.isShown ? 'block' : 'hidden'
      }`}>
      <Toaster
        showToast={showToast}
        setShowToast={setShowToast}
        isStatus={isNotify}
      />
      <div className="p-4 flex flex-col gap-2 min-w-1/3 h-[95%] bg-white rounded-lg overflow-y-auto overflow-x-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-500">Edit Product</h1>
          <label className="inline-flex items-center cursor-pointer">
            <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Off
            </span>
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={(e) => setStatus(e.target.checked)}
              defaultChecked={product?.data?.status}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              On
            </span>
          </label>
        </div>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <label htmlFor="Name">
            Category
            <select
              name="category"
              id="category"
              className={styles.input}
              defaultValue={product?.data?.category}>
              {listsSubmenu.map((item) => {
                return (
                  <option
                    key={item.name}
                    value={item.name}
                    selected={product?.data?.category === item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="image">
            Image
            <div className="w-full flex justify-between gap-4 items-center relative">
              <button
                type="button"
                onClick={() => setShownInputPicture({ isShown: false })}
                className={`absolute top-0 right-0 p-1 flex items-center gap-1 ${
                  !shownInputPicture.isShown && 'hidden'
                }`}>
                <i>
                  <RiArrowGoBackFill />
                </i>
                Back
              </button>
              <img
                src={
                  shownInputPicture.image
                    ? shownInputPicture.image
                    : product?.data?.image || '/images/empty-food.png'
                }
                alt=""
                className="w-[150px] h-[100px] object-cover rounded"
              />
              <div
                className={`flex gap-2 items-center ${
                  shownInputPicture.isShown && 'hidden'
                }`}>
                <button
                  onClick={() =>
                    setShownInputPicture({
                      isShown: true,
                      type: 'link',
                    })
                  }
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded">
                  Link
                </button>
                <p>or</p>
                <button
                  onClick={() =>
                    setShownInputPicture({
                      isShown: true,
                      type: 'file',
                    })
                  }
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded">
                  Upload
                </button>
              </div>
              {shownInputPicture.isShown &&
                (shownInputPicture.type === 'link' ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) => {
                        shownInputPicture.image = e.target.value;
                      }}
                      id="image"
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => (shownInputPicture.isShown = false)}
                      className="p-1 absolute bottom-0 right-0 bg-green-500 text-white rounded">
                      <FaCheckCircle />
                    </button>
                  </>
                ) : (
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className={styles.input}
                  />
                ))}
            </div>
          </label>
          <label htmlFor="food-name">
            Food Name
            <input
              defaultValue={product?.data?.name}
              type="text"
              name="name"
              id="food-name"
              className={styles.input}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              defaultValue={product?.data?.price}
              type="number"
              name="price"
              id="price"
              className={styles.input}
            />
          </label>
          <label htmlFor="discount">
            Discount
            <div className="relative ">
              <input
                defaultValue={product?.data?.discount}
                type="number"
                name="discount"
                id="discount"
                className={styles.input}
                max="100"
              />
              <div className="absolute right-0 bg-white bottom-0 h-[90%] px-4 rounded-lg flex items-center justify-center">
                <FaPercent />
              </div>
            </div>
          </label>
          <div className="w-full flex gap-2">
            <button
              type="button"
              className={styles.button}
              onClick={() => setShowEdit(false)}>
              Close
            </button>
            <button type="submit" className={styles.button}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
