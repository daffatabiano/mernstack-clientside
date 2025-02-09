import { RiArrowGoBackFill } from 'react-icons/ri';
import { styles } from '../../../helper/styles';
import { FaCheckCircle } from 'react-icons/fa';
import Switch from '../../Switch';
import { Button, Input, Modal, Select } from 'antd';
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from '../../../redux/reducers/api/fetchReducers';
import { useState } from 'react';
import { useUpdateProductAdminMutation } from '../../../redux/reducers/api/putReducers';
export default function ModalUpdate(prop) {
  const { setShowEdit, showEdit, shownInputPicture, setShownInputPicture } =
    prop;
  const { data: category } = useGetCategoriesQuery();
  const [updateProductAdmin, { isLoading, isSuccess }] =
    useUpdateProductAdminMutation();
  const { refetch } = useGetAllProductsQuery();
  const [status, setStatus] = useState(false);
  const [categoryChoose, setCategoryChoose] = useState('');

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      category: categoryChoose,
      image: e?.target?.image?.value,
      name: e?.target?.name?.value,
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
      status: status,
    };
    try {
      await updateProductAdmin({ id: showEdit.data?._id, ...body }).unwrap();
      if (!isLoading) {
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
      centered
      footer={null}
      onCancel={() => setShowEdit({ isShown: false })}>
      <div className="p-4 flex flex-col gap-2 min-w-1/3 h-[95%] bg-white rounded-lg overflow-y-auto overflow-x-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-500">Edit Product</h1>
          <Switch product={showEdit} setStatus={setStatus} />
        </div>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <label htmlFor="category">Category</label>
          <Select
            onChange={(e) => setCategoryChoose(e)}
            name="category"
            id="category"
            options={category?.data}
            defaultValue={showEdit?.data?.category}
          />
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
                    : showEdit?.data?.image || '/images/empty-food.png'
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
          <label htmlFor="food-name">Food Name</label>
          <Input
            defaultValue={showEdit?.data?.name}
            type="text"
            name="name"
            id="food-name"
            className="rounded-lg border-0 bg-gray-200 placeholder-gray-600 text-gray-600 focus:bg-white focus:outline-none focus:border focus:border-indigo-500"
          />
          <label htmlFor="price">Price</label>
          <Input
            defaultValue={showEdit?.data?.price}
            type="number"
            name="price"
            id="price"
            className="rounded-lg border-0 bg-gray-200 placeholder-gray-600 text-gray-600 focus:bg-white focus:outline-none focus:border focus:border-indigo-500"
          />
          <label htmlFor="discount">Discount</label>
          <Input
            defaultValue={showEdit?.data?.discount}
            type="number"
            name="discount"
            id="discount"
            className="rounded-lg border-0 bg-gray-200 placeholder-gray-600 text-gray-600 focus:bg-white focus:outline-none focus:border focus:border-indigo-500"
            min="0"
            max="100"
            suffix="%"
          />
          <div className="w-full flex gap-2 justify-end">
            <Button
              type="default"
              htmlType="button"
              onClick={() => setShowEdit(false)}
              disabled={isLoading}>
              Close
            </Button>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
