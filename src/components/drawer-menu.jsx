import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../redux/reducers/cartReducers';
import { formatIDR, totalShopItems } from '../utils/throttle';
import { useDispatch } from 'react-redux';
import { FaCartPlus } from 'react-icons/fa';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

export default function DrawerMenu(prop) {
  const {
    handlePayment,
    setShowDrawer,
    showDrawer,
    totalQuantity,
    dataOrder,
    totalPrice,
  } = prop;
  const dispatch = useDispatch();

  return (
    <div
      className={`h-screen w-full md:w-2/5 z-[999] bg-indigo-500 fixed top-0 right-0 transition-transform duration-300  ${
        showDrawer ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <div className="w-full h-full  p-2">
        <div className="absolute bottom-0 left-0 md:hidden">
          <button
            onClick={() => setShowDrawer((curr) => !curr)}
            type="button"
            className={` bg-white rounded-r-full text-lg relative p-4 `}>
            <i className={` text-indigo-500`}>
              <FaCartPlus />
            </i>
            {totalQuantity > 0 && (
              <span className="absolute text-white text-xs top-0 right-0 bg-red-500 rounded-full px-1">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
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
    </div>
  );
}
