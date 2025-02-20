import { RiArrowGoBackFill } from 'react-icons/ri';
import { styles } from '../../../helper/styles';
import { FaCheckCircle, FaPercent } from 'react-icons/fa';
import { useState } from 'react';
import useUpload from '../../../hooks/useUpload';
import { useCreateProductAdminMutation } from '../../../redux/reducers/api/postReducers';
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from '../../../redux/reducers/api/fetchReducers';
import { useSearchParams } from 'react-router-dom';
import { Button, Input, Modal, Select } from 'antd';

export default function ModalCreate(prop) {
  const { setShownAdd, shownAdd, page = 1, pageSize = 10 } = prop;
  const [shownInputPicture, setShownInputPicture] = useState({
    isShown: false,
    type: '',
    image: '',
  });
  const [searchParams] = useSearchParams();
  const [createProductAdmin, { isLoading, isSuccess }] =
    useCreateProductAdminMutation();
  const { refetch } = useGetAllProductsQuery({
    page: page,
    limit: pageSize,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'createdAt',
  });
  const [categoryChoose, setCategoryChoose] = useState('');
  const { data: category } = useGetCategoriesQuery();

  const { upload } = useUpload();

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const url = await upload(file);
      setShownInputPicture({
        ...shownInputPicture,
        image: url.data.imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const body = {
      category: categoryChoose,
      image:
        shownInputPicture.image.length !== 0
          ? shownInputPicture.image
          : e?.target?.image?.value,
      name: e?.target?.name?.value?.toLowerCase(),
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
    };

    try {
      await createProductAdmin(body).unwrap();
      if (!isLoading) {
        setShownAdd(false);
        await refetch();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title="Create Product"
      open={shownAdd}
      footer={false}
      onCancel={() => setShownAdd(false)}
      onClose={() => setShownAdd(false)}>
      <div className="w-full h-full p-4 bg-white rounded-lg overflow-auto">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <label htmlFor="category">Category</label>
          <Select
            required
            onChange={(e) => setCategoryChoose(e)}
            name="category"
            id="category"
            options={category?.data}
            // className={styles.input}
          />
          <label htmlFor="image">
            Image
            <div className="w-full flex justify-center gap-4 items-center relative">
              <button
                type="button"
                disabled={isLoading}
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
                <Button
                  disabled={isLoading}
                  onClick={() =>
                    setShownInputPicture({
                      isShown: true,
                      type: 'link',
                    })
                  }
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded">
                  Link
                </Button>
                <p>or</p>
                <Button
                  disabled={isLoading}
                  onClick={() =>
                    setShownInputPicture({
                      isShown: true,
                      type: 'file',
                    })
                  }
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded">
                  Upload
                </Button>
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
                      className={`${styles.input} lowercase`}
                      required
                    />
                    <button
                      disabled={isLoading}
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
                    onChange={handleUpload}
                    className={styles.input}
                  />
                ))}
            </div>
          </label>
          <label htmlFor="food-name">Food Name</label>
          <Input
            className="rounded border-0 bg-gray-100"
            type="text"
            name="name"
            id="food-name"
          />
          <label htmlFor="price">Price</label>
          <Input
            className="rounded border-0 bg-gray-100"
            type="number"
            name="price"
            id="price"
          />
          <label htmlFor="discount">Discount</label>
          <Input
            className="rounded border-0 bg-gray-100"
            type="number"
            name="discount"
            id="discount"
            suffix={<FaPercent />}
          />
          <div className="flex gap-4 justify-end">
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => setShownAdd(false)}>
              Close
            </Button>
            <Button disabled={isLoading} htmlType="submit">
              {isLoading ? 'Loading...' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
