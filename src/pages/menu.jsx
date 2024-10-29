import { FaCartPlus } from 'react-icons/fa6';
import CardMenu from '../components/card-menu';
import ButtonHeaderMenu from '../components/button-header-menu';
import CardCategory from '../components/card-category';
import { useState } from 'react';
import { listsSubmenu } from '../helper/constants';
import useFetch from '../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducers/cartReducers';

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
  const [onModals, setOnModals] = useState({
    isShown: false,
    data: {},
  });

  const Totalcart = useSelector((state) => state.cart.getCart);

  const productsByFilter = products?.filter((item) => {
    if (toCategoryMenu.menu.name === 'All' || toCategoryMenu.menu.name === '') {
      return item;
    } else {
      return item.category === toCategoryMenu.menu.name;
    }
  });

  return (
    <div className="bg-slate-200/50 min-w-screen w-full h-screen flex flex-col justify-center items-center">
      {onModals.isShown && (
        <div className="fixed p-2 bg-slate-800/40 flex justify-center items-center w-full h-full min-h-screen min-w-screen z-[9999]">
          <div className="bg-white rounded-lg w-full p-2">
            <img
              src={onModals.data?.image}
              alt=""
              className="w-full object-cover object-center rounded-lg"
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
        className={`w-full h-full p-4 flex flex-col gap-2 justify-center items-center ${
          toCategoryMenu.closeCategory && 'hidden'
        }`}>
        {listsSubmenu.map((item, index) => (
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
      {toCategoryMenu.closeCategory && (
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

      {toCategoryMenu.closeCategory && (
        <>
          <img
            src={toCategoryMenu.menu.image}
            alt={`image-of-${toCategoryMenu.menu.name}`}
            className="w-full h-1/6 opacity-50 object-cover object-center fixed top-0 left-0 rounded-b-lg"
          />

          <div className="w-[90%] min-h-[90%] h-full p-2 rounded-lg mt-32 bg-white overflow-y-auto absolute flex flex-col gap-2 shadow-lg">
            {productsByFilter?.map((product) => (
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
            ))}
          </div>
        </>
      )}

      <div className="fixed right-2 bottom-2 ">
        <button
          type="button"
          className="rounded-full text-lg relative bg-indigo-500 p-4">
          <i className="text-white">
            <FaCartPlus />
          </i>
          <span className="absolute text-white text-xs top-0 right-0 bg-red-500 rounded-full px-1">
            {Totalcart}
          </span>
        </button>
      </div>
    </div>
  );
}
