import { useState } from 'react';
import { listsSubmenu } from '../../helper/constants';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';
import usePost from '../../hooks/usePost';
import { FaCheck, FaCheckCircle, FaPercent } from 'react-icons/fa';
import { RiArrowGoBackFill } from 'react-icons/ri';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);
  const [products, setProducts] = useState([]);
  const { createProduct } = usePost();
  const [shownInputPicture, setShownInputPicture] = useState({
    isShown: false,
    type: '',
    image: '',
  });

  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const body = {
      category: e.target.category.value,
      image: e.target.image.value || '/images/empty-food.png',
      name: e.target.name.value,
      discount: e.target.discount.value,
      price: e.target.price.value,
    };

    try {
      const res = await createProduct(body);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Modals Add Products */}
      <div
        className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
          shownAdd ? 'block' : 'hidden'
        }`}>
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
              <div className="w-full flex justify-center items-center relative">
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
                    Input
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
      {/* End Modals Add Products */}

      {/* Main Menu Layout */}
      <DashboardLayout>
        <div className="w-full h-full p-4">
          {/* Header */}
          <div className="flex gap-2 items-center px-2">
            <div className="w-[90%] h-12 gap-4 flex overflow-x-auto overflow-y-hidden">
              {listsSubmenu.map((item) => (
                <h1 key={item.name} className={styles.submenu}>
                  {item.name}
                </h1>
              ))}
            </div>
            <div className="w-[10%]">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-indigo-500 text-white"
                onClick={() => setShownAdd(true)}>
                Add +
              </button>
            </div>
          </div>
          {/* End Header */}

          {/* Content */}
          <div className="w-full h-full">
            {products.length === 0 ? (
              <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                <img
                  src="/images/empty-products.png"
                  alt=""
                  className="w-1/2 h-1/2 object-cover"
                />
                <p className="text-2xl font-bold ">
                  No Products{' '}
                  <span
                    onClick={() => setShownAdd(true)}
                    className="text-indigo-500 hover:underline cursor-pointer">
                    Added.
                  </span>
                </p>
              </div>
            ) : (
              <div>Have some Products</div>
            )}
          </div>

          {/* End Content */}
        </div>
      </DashboardLayout>
      {/* End Menu Layout */}
    </>
  );
}
