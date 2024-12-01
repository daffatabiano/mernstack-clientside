import { RiDiscountPercentFill } from 'react-icons/ri';

export default function CardMenu(prop) {
  const { item, priceAfterDiscount, setShowDelete, setShowEdit } = prop;

  return (
    <div
      key={item?._id}
      className={`bg-white drop-shadow-md h-[500px] rounded-lg flex flex-col justify-between  hover:shadow-lg transition-all ${
        !item?.status && 'bg-slate-500/50 cursor-not-allowed'
      }`}>
      <div className="w-full h-60 relative overflow-hidden rounded-t-lg">
        {!item?.status && (
          <img
            src="/images/sold.png"
            alt="sold-picture"
            className="w-full h-full object-cover absolute z-10"
          />
        )}
        <img
          src={item?.image || '/images/empty-food.png'}
          alt=""
          className={`w-full h-full object-cover hover:scale-110 transition-all duration-300 object-center ${
            !item?.status && 'grayscale'
          }`}
        />
      </div>
      <div className={`p-4 ${!item?.status && 'opacity-50'}`}>
        <p className="text-xl flex justify-between items-center font-bold capitalize text-indigo-700">
          {item?.name}{' '}
          <span
            className={`font-normal text-sm p-1 rounded ${
              item?.status
                ? 'text-green-500 bg-green-100'
                : 'text-red-500 bg-red-100 opacity-70'
            }`}>
            {item?.status ? 'Available' : 'Not Available'}
          </span>
        </p>
        <p className="text-sm capitalize text-gray-500 italic">
          {item?.category}
        </p>
        <p className="text-md flex items-center gap-2 line-through">
          {Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(item?.price)}
        </p>
        <div
          className={`${
            !item?.status && 'hidden'
          } text-green-500 bg-green-100 w-full flex gap-2 items-center`}>
          <span className=" flex gap-1 items-center  p-1 rounded">
            <i className="text-lg">
              <RiDiscountPercentFill />
            </i>
            {item?.discount}
          </span>
          <p className="font-bold">
            = {priceAfterDiscount(item?.price, item?.discount)}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 p-4">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setShowDelete({ isShown: true, id: item?._id })}>
          Delete
        </button>
        <button
          type="button"
          onClick={() => setShowEdit({ isShown: true, id: item?._id })}
          className="px-4 py-2 bg-indigo-500 text-white rounded">
          Edit
        </button>
      </div>
    </div>
  );
}
