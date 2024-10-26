import { RiArrowGoBackFill } from 'react-icons/ri';
import { listsSubmenu } from '../../../helper/constants';
import { styles } from '../../../helper/styles';
import { FaCheckCircle, FaPercent } from 'react-icons/fa';

export default function ModalCreate(prop) {
  const {
    setShownAdd,
    shownAdd,
    handleAdd,
    notify,
    shownInputPicture,
    setShownInputPicture,
  } = prop;

  return (
    <div
      className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
        shownAdd ? 'block' : 'hidden'
      }`}>
      <div
        className={`absolute gap-2 unset-0 top-2 min-w-48 p-2 h-12 flex items-center bg-white drop-shadow-lg shadow-slate-800 rounded ${
          !notify.isShown ? 'hidden' : ''
        }`}>
        <i
          className={`text-2xl ${
            notify.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}>
          {notify.icon}
        </i>
        <h1
          className={`text-lg ${
            notify.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}>
          {notify.message}
        </h1>
      </div>
      <div className="w-1/2 h-full p-4 bg-white rounded-lg overflow-auto">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <label htmlFor="Name">
            Category
            <select
              required
              name="category"
              id="category"
              className={styles.input}>
              {listsSubmenu.map((item) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="image">
            Image
            <div className="w-full flex justify-center gap-4 items-center relative">
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
                    : '/images/empty-food.png'
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
                      required
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
                    required
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
              type="text"
              name="name"
              id="food-name"
              required
              className={styles.input}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              name="price"
              id="price"
              required
              className={styles.input}
            />
          </label>
          <label htmlFor="discount">
            Discount
            <div className="relative ">
              <input
                type="number"
                name="discount"
                id="discount"
                className={styles.input}
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
              onClick={() => setShownAdd(false)}>
              Close
            </button>
            <button type="submit" className={styles.button}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
