import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducers';
import { FaCartPlus } from 'react-icons/fa';
import ModalWrapper from './Wrapper';
import ModalCard from './Card';

export default function ModalMenu(prop) {
  const { onModals, setOnModals, setQuantity, setNotes, notes, quantity } =
    prop;
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <ModalCard>
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
                  ...onModals?.data,
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
      </ModalCard>
    </ModalWrapper>
  );
}
