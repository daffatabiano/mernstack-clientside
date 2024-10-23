import { useState } from 'react';
import { listsSubmenu } from '../../helper/constants';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';
import usePost from '../../hooks/usePost';
import { FaCheck, FaCheckCircle, FaPercent } from 'react-icons/fa';
import { RiArrowGoBackFill, RiDiscountPercentFill } from 'react-icons/ri';
import useFetch from '../../hooks/useGet';
import useDelete from '../../hooks/useDelete';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);
  const { createProduct, updateProduct } = usePost();
  const { data } = useFetch('products');
  const { deleteProduct } = useDelete();
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [showDelete, setShowDelete] = useState({
    isShown: false,
    id: '',
  });
  const [showEdit, setShowEdit] = useState({
    isShown: false,
    id: '',
  });
  const products = data?.data || [];
  const [shownInputPicture, setShownInputPicture] = useState({
    isShown: false,
    type: '',
    image: '',
  });
  const { data: product } = useFetch(`products/${showEdit.id}`);

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
      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
        }, 2000);
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      }, 2000);
    }
  };

  const priceAfterDiscount = (price, discount) => {
    const newPrice = Number(price) - Number(price * discount) / 100;
    return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(newPrice);
  };

  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
        });
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      category: e?.target?.category?.value,
      image: e?.target?.image?.value || '/images/empty-food.png',
      name: e?.target?.name?.value,
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
      status: status,
    };

    if (body.discount > 100) {
      return setNotify({
        isShown: true,
        message: 'Discount cannot be more than 100%',
        type: 'error',
        icon: <MdError />,
      });
    }

    try {
      const res = await updateProduct(showEdit.id, body);

      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
    }
  };

  console.table(status, 'product');

  return (
    <>
      {/* Modals Add Products */}
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
      {/* End Modals Add Products */}

      {/* Modals delete Product */}
      <div
        className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
          showDelete.isShown ? 'block' : 'hidden'
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
        <div className="p-4 flex flex-col gap-2 bg-white rounded-lg overflow-auto">
          <h1>Are you sure you want to delete this product?</h1>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowDelete({ isShown: false })}
              className="px-4 py-2 bg-indigo-500 text-white rounded">
              Cancel
            </button>
            <button
              onClick={() => deleteProductHandler(showDelete.id)}
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* End Modals delete Product */}

      {/* Modals Edit Product */}
      <div
        className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
          showEdit.isShown ? 'block' : 'hidden'
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
      {/* End Modals Edit Product */}

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
          <div
            className={`w-full h-full ${
              products?.length === 0
                ? 'flex justify-center items-center'
                : 'grid grid-cols-3 gap-4 p-4 grid-rows-auto'
            }`}>
            {products?.length === 0 ? (
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
              products?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white drop-shadow-md h-fit rounded-lg">
                  <div className="w-full h-60">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xl flex justify-between items-center font-bold capitalize text-indigo-700">
                      {item.name}{' '}
                      <span
                        className={`font-normal text-sm p-1 rounded ${
                          item.status
                            ? 'text-green-500 bg-green-100'
                            : 'text-red-500 bg-red-100'
                        }`}>
                        {item.status ? 'Available' : 'Not Available'}
                      </span>
                    </p>
                    <p className="text-sm capitalize text-gray-500 italic">
                      {item.category}
                    </p>
                    <p className="text-md flex items-center gap-2 line-through">
                      {Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(item.price)}
                    </p>
                    <div className="text-green-500 bg-green-100 w-full flex gap-2 items-center">
                      <span className=" flex gap-1 items-center  p-1 rounded">
                        <i className="text-lg">
                          <RiDiscountPercentFill />
                        </i>
                        {item.discount}
                      </span>
                      <p className="font-bold">
                        = {priceAfterDiscount(item.price, item.discount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 p-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() =>
                        setShowDelete({ isShown: true, id: item._id })
                      }>
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setShowEdit({ isShown: true, id: item._id })
                      }
                      className="px-4 py-2 bg-indigo-500 text-white rounded">
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* End Content */}
        </div>
      </DashboardLayout>
      {/* End Menu Layout */}
    </>
  );
}
