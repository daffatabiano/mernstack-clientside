import { RiArrowGoBackFill } from 'react-icons/ri';
import { styles } from '../../../helper/styles';
import { FaCheckCircle, FaPercent } from 'react-icons/fa';
import Switch from '../../Switch';
import { Modal, Select } from 'antd';
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from '../../../redux/reducers/api/fetchReducers';
import { useUpdateProductMutation } from '../../../redux/reducers/api/putReducers';
export default function ModalUpdate(prop) {
  const {
    setShowEdit,
    showEdit,
    // handleEdit,
    product,
    setStatus,
    shownInputPicture,
    setShownInputPicture,
  } = prop;
  const { data: category } = useGetCategoriesQuery();
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const { refetch } = useGetAllProductsQuery({
    refetchOnMountOrArgChange: true,
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      category: e?.target?.category?.value,
      image: e?.target?.image?.value,
      name: e?.target?.name?.value,
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
      status: status,
    };

    try {
      await updateProduct(body, showEdit.id).unwrap();
      if (isSuccess) {
        setShowEdit({ isShown: false });
        await refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={showEdit.isShown}
      onCancel={() => setShowEdit({ isShown: false })}>
      <div className="p-4 flex flex-col gap-2 min-w-1/3 h-[95%] bg-white rounded-lg overflow-y-auto overflow-x-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-500">Edit Product</h1>
          <Switch product={product} setStatus={setStatus} />
        </div>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <label htmlFor="Name">
            Category
            <Select
              name="category"
              id="category"
              options={category?.data}
              defaultValue={product?.data?.category}
            />
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
    </Modal>
  );
}
