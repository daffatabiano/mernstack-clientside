import { FaCartPlus } from 'react-icons/fa6';
import CardMenu from '../components/card-menu';
import ButtonHeaderMenu from '../components/button-header-menu';
import CardCategory from '../components/card-category';
import { useEffect, useState } from 'react';
import { listsSubmenu } from '../helper/constants';
import useFetch from '../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../redux/reducers/cartReducers';
import { useNavigate } from 'react-router-dom';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import axios from 'axios';

export default function Menu() {
  const [toCategoryMenu, setToCategoryMenu] = useState({
    closeCategory: false,
    menu: {},
  });
  const { data } = useFetch('products');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const products = data?.data;
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [onModals, setOnModals] = useState({
    isShown: false,
    data: {},
  });
  const navigate = useNavigate();

  const dataOrder = useSelector((state) => state?.cart?.cart);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (dataOrder) {
      localStorage.setItem('cart', JSON.stringify(dataOrder));
    }
  }, [dataOrder]);

  const productsByFilter = products?.filter((item) => {
    if (toCategoryMenu.menu.name === 'All' || toCategoryMenu.menu.name === '') {
      return item;
    } else {
      return item.category === toCategoryMenu.menu.name;
    }
  });

  const formatIDR = (price) => {
    if (!price) {
      return `Rp. 0`;
    }

    return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalShopItems = (price, discount, quantity) => {
    const newPrice = Number(price) - Number(price * discount) / 100;
    const total = newPrice * quantity;

    return total;
  };

  const totalPrice = dataOrder?.map((item) => {
    const total = totalShopItems(item.price, item.discount, item.quantity);

    return total;
  });

  const handlePayment = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      const body = {
        amount: totalPrice?.reduce((total, item) => total + item, 0),
        data: dataOrder,
      };
      try {
        const res = await axios.post(`${url}/order`, body, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          try {
            const body = {
              id: res?.data?.data?._id,
              amount: Number(res?.data?.data?.amount),
            };

            console.log(body);

            const resTransactions = await axios.post(`${url}/midtrans`, body, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: btoa(import.meta.env.CLIENT_KEY + ':'),
              },
            });
            window.snap.pay(resTransactions?.data?.token, {
              onSuccess: function (result) {
                console.log(result);
                dispatch(clearCart());
                localStorage.removeItem('cart');
                navigate('/history');
              },
              onPending: function (result) {
                console.log(result);
                dispatch(clearCart());
                localStorage.removeItem('cart');
                navigate('/history');
              },
              onError: function (result) {
                console.log(result);
                navigate('/error');
              },
              onClose: function () {
                alert('you closed the popup without finishing the payment');
              },
            });
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const totalQuantity = dataOrder?.reduce(
    (total, item) => Number(total) + Number(item.quantity),
    0
  );

  useEffect(() => {
    const snapScriptUrl = import.meta.env.VITE_SNAP_SCRIPT_URL;

    let script = document.createElement('script');
    script.src = snapScriptUrl;

    const midTransClientKey = import.meta.env.CLIENT_KEY;
    script.setAttribute('data-client-key', midTransClientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-slate-200/50 h-full">
      <div className=" md:min-h-screen min-w-screen overflow-hidden w-full h-full flex flex-col justify-center items-center">
        {/* Modals Order */}
        {onModals?.isShown && (
          <div className="fixed p-2 bg-slate-800/40 flex justify-center items-center w-full h-full min-h-screen min-w-screen z-[100]">
            <div className="bg-white rounded-lg w-full md:w-fit p-2">
              <img
                src={onModals.data?.image}
                alt=""
                className="w-full md:h-60 md:object-contain object-cover object-center rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="font-bold text-indigo-500 text-2xl text-center">
                  {onModals.data?.name}
                </label>
                <label
                  htmlFor=""
                  className="font-bold  flex flex-col gap-2 justify-center items-center">
                  Notes
                  <textarea
                    onChange={(e) => setNotes(e.target.value)}
                    id=""
                    cols="30"
                    rows="3"
                    className=" resize-none bg-slate-200/50 p-2 font-normal rounded-lg focus:outline-none"
                  />
                </label>
                <label
                  htmlFor=""
                  className="font-bold flex flex-col gap-2 justify-center items-center">
                  Quantity
                  <input
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    id=""
                    className="bg-slate-200/50 w-12 p-2 font-normal text-center rounded-lg focus:outline-none"
                    defaultValue={1}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        ...onModals.data,
                        notes,
                        quantity,
                      })
                    );
                    setOnModals({
                      ...onModals,
                      isShown: false,
                    });
                  }}
                  className="w-full flex justify-center mt-4 items-center bg-indigo-500 text-white py-2 rounded-md gap-2">
                  <i className="text-2xl">
                    <FaCartPlus />
                  </i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full h-full p-4 flex flex-col md:w-1/3 gap-2 justify-center items-center ${
            toCategoryMenu.closeCategory && 'hidden'
          }`}>
          {listsSubmenu?.map((item, index) => (
            <CardCategory
              onClick={() => {
                setToCategoryMenu({
                  ...toCategoryMenu,
                  closeCategory: !toCategoryMenu.closeCategory,
                  menu: item,
                });
              }}
              img={item.image}
              category={item?.name}
              key={index}
            />
          ))}
        </div>

        {toCategoryMenu?.closeCategory && (
          <div className="fixed top-2 w-full px-4 h-12 flex justify-center z-10 overflow-x-auto scrollbar-header-menu">
            {listsSubmenu.map((item, i) => (
              <ButtonHeaderMenu
                key={i}
                title={item?.name}
                active={item.name === toCategoryMenu.menu.name}
                onClick={() => {
                  setToCategoryMenu({
                    ...toCategoryMenu,
                    menu: {
                      ...item,
                      image: item.image,
                      nama: item.name === 'All' ? '' : item.name,
                    },
                  });
                }}
              />
            ))}
          </div>
        )}

        {toCategoryMenu?.closeCategory && (
          <>
            <img
              src={toCategoryMenu.menu.image}
              alt={`image-of-${toCategoryMenu.menu.name}`}
              className="w-full h-1/5 md:h-1/3 opacity-50 object-cover object-center fixed top-0 left-0 rounded-b-lg"
            />

            <div className="w-[90%] md:w-1/2 min-h-[90%] md:gap-4 h-full p-2 rounded-lg mt-32 bg-white overflow-y-auto absolute flex flex-col gap-2 shadow-lg">
              {productsByFilter?.length !== 0 || !productsByFilter ? (
                productsByFilter?.map((product) => (
                  <CardMenu
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    discount={product.discount}
                    onClick={() => {
                      setOnModals({
                        isShown: true,
                        data: product,
                      });
                    }}
                  />
                ))
              ) : (
                <div className="flex flex-col h-full w-full justify-center items-center">
                  <img src="/images/empty-products.png" alt="" />
                  <h1 className="text-2xl text-center font-bold text-indigo-500">
                    {toCategoryMenu?.menu.name} is currently Unavailable
                  </h1>
                </div>
              )}
            </div>
          </>
        )}

        <div
          className={`h-screen w-full md:w-2/5 z-[999] bg-indigo-500 p-2 fixed top-0 right-0 transition-transform duration-300  ${
            showDrawer ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div
            className={`flex flex-col h-full gap-2 overflow-y-auto ${
              dataOrder?.length === 0 || (!dataOrder ? 'justify-end' : '')
            }`}>
            {dataOrder?.length === 0 || !dataOrder ? (
              <div className="flex flex-col h-full justify-center items-center">
                <img src="/images/empty-cart.png" alt="" />
                <h1 className="text-2xl text-center font-bold text-white">
                  Your cart is empty
                </h1>
              </div>
            ) : (
              dataOrder?.map((item) => (
                <>
                  <div className="bg-white w-full flex gap-2 justify-between items-center p-2 h-20  rounded-lg ">
                    <p className="flex gap-2 items-center">
                      <div className="p-1 px-2 rounded-lg flex items-center gap-1 text-xl text-indigo-500 bg-slate-100">
                        <button
                          type="button"
                          onClick={() => dispatch(increaseQuantity(item._id))}
                          className="text-emerald-500">
                          <CiSquarePlus />
                        </button>
                        <p>{item.quantity}x </p>
                        <button
                          type="button"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          className="text-red-500">
                          <CiSquareMinus />
                        </button>
                      </div>
                      {item.name}
                    </p>

                    <p>
                      {formatIDR(
                        totalShopItems(item.price, item.discount, item.quantity)
                      )}
                    </p>
                  </div>
                </>
              ))
            )}
            <div className="flex flex-col h-full gap-1 w-full justify-end">
              <p
                type="button"
                onClick={() => dispatch(clearCart())}
                className="text-white underline text-sm text-end w-fit hover:text-red-600 cursor-pointer">
                clear cart
              </p>
              <hr className="my-2" />
              <div className="flex flex-col gap-2 justify-between items-center">
                <div className="bg-white w-full flex gap-2 justify-between items-center p-2 h-20  rounded-lg">
                  <p className="flex gap-2 items-center">
                    <span className="p-1 px-2 rounded-lg text-xl text-indigo-500 bg-slate-100">
                      {totalQuantity || 0}x
                    </span>
                    Total
                  </p>
                  <p>{formatIDR(totalPrice?.reduce((a, b) => a + b, 0))}</p>
                </div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="bg-white w-32 flex justify-center items-center text-indigo-500 p-2 rounded-lg">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {toCategoryMenu.closeCategory && (
          <div
            className={`fixed z-[9999] transition-transform duration-400 ${
              showDrawer ? 'left-0 bottom-2 md:left-[60%]' : 'right-2 bottom-2'
            }`}>
            <button
              onClick={() => setShowDrawer((curr) => !curr)}
              type="button"
              className={`${
                showDrawer
                  ? 'bg-white rounded-e-full'
                  : 'bg-indigo-500 rounded-full'
              } text-lg relative  p-4`}>
              <i
                className={` ${showDrawer ? 'text-indigo-500' : 'text-white'}`}>
                <FaCartPlus />
              </i>
              {totalQuantity > 0 && (
                <span className="absolute text-white text-xs top-0 right-0 bg-red-500 rounded-full px-1">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
