import { FaCartPlus } from 'react-icons/fa6';
import { RiDiscountPercentFill } from 'react-icons/ri';

export default function CardMenu(prop) {
  const { price, title, image, discount, onClick } = prop;

  const formatIDR = (price) => {
    return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceAfterDiscount = (price, discount) => {
    const newPrice = Number(price) - Number(price * discount) / 100;

    return formatIDR(newPrice);
  };

  return (
    <div className="w-full min-h-28 rounded-lg flex border-2 gap-2 overflow-hidden border-indigo-500 shadow-lg relative">
      <span className="absolute top-0 font-semibold text-white right-0 gap-1 h-6 rounded-s-lg flex justify-center items-center p-2 bg-emerald-600">
        <i>
          <RiDiscountPercentFill />{' '}
        </i>
        {discount}
      </span>
      <img
        src={image}
        alt={`image-of-${title}`}
        className="w-24 h-full object-cover object-center"
      />
      <div className="w-full h-full ">
        <p className="text-2xl  text-indigo-800">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-light flex text-red-600 line-through">
            {formatIDR(price)}{' '}
          </span>
        </div>

        <div className="w-full flex justify-between items-center mt-2 p-1">
          <p className="text-emerald-600 font-semibold text-lg no-underline bg-emerald-100 w-fit rounded-lg px-1">
            {priceAfterDiscount(price, discount)}
          </p>
          <button
            onClick={onClick}
            type="button"
            className=" rounded-lg font-semibold bg-emerald-600 p-2 text-white">
            <i>
              <FaCartPlus />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}
