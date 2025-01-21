import { useState } from 'react';
import { listsSubmenu } from '../../helper/constants';
import DashboardLayout from './layout';
import usePost from '../../hooks/usePost';
import useFetch from '../../hooks/useGet';
import useDelete from '../../hooks/useDelete';
import CardMenu from '../../components/dashboard/card-menu';
import ModalCreate from '../../components/dashboard/modals/modal-create';
import ModalDelete from '../../components/dashboard/modals/modal-delete';
import ModalUpdate from '../../components/dashboard/modals/modal-update';
import MenuHeader from '../../components/dashboard/MenuHeader';
import { priceAfterDiscount } from '../../helper/helper';
import useUpload from '../../hooks/useUpload';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);
  const { createProduct, updateProduct } = usePost();
  const { data } = useFetch('products');
  const { deleteProduct } = useDelete();
  const [status, setStatus] = useState(false);
  const [showByCategory, setShowByCategory] = useState('');
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

  const [showToast, setShowToast] = useState(false);
  const [notify, setNotify] = useState({
    type: '',
    message: '',
  });

  const { upload } = useUpload();

  const handleAdd = async (e) => {
    e.preventDefault();
    const body = {
      category: e?.target?.category?.value,
      image:
        shownInputPicture.image.length !== 0
          ? shownInputPicture.image
          : e?.target?.image?.value,
      name: e?.target.name.value.toLowerCase(),
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
    };

    try {
      await createProduct(body).then((res) => {
        if (res.status === 200) {
          setShowToast(true);
          setNotify({
            message: res.data.message,
            type: 'success',
          });
          setTimeout(() => {
            data();
            setShownAdd(false);
          }, 1000);
        } else {
          setShowToast(true);
          setNotify({
            message: res.data.message,
            type: 'error',
          });
        }
      });
    } catch (err) {
      setShowToast(true);
      setNotify({
        message: err.response.data.message,
        type: 'error',
      });
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        setShowToast(true);
        setNotify({
          message: res.data.message,
          type: 'success',
        });
        data();
      } else {
        setShowToast(true);
        setNotify({
          message: res.data.message,
          type: 'error',
        });
      }
    } catch (err) {
      setShowToast(true);
      setNotify({
        message: err.response.data.message,
        type: 'error',
      });
    }
  };

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

    if (body.discount > 100) {
      return setNotify({
        message: 'Discount cannot be more than 100%',
        type: 'error',
      });
    }

    try {
      const res = await updateProduct(showEdit.id, body);

      if (res.status === 200) {
        setShowToast(true);
        setNotify({
          message: res.data.message,
          type: 'success',
        });
        setShowEdit({
          isShown: false,
          id: '',
        });
        data?.refetch();
      } else {
        setShowToast(true);
        setNotify({
          message: res.data.message,
          type: 'error',
        });
      }
    } catch (err) {
      setShowToast(true);
      setNotify({
        message: err.response.data.message,
        type: 'error',
      });
    }
  };

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

  const filterProducts = products.filter(
    (item) => item.category === showByCategory
  );

  return (
    <>
      {/* Modals Add Products */}
      <ModalCreate
        setShownAdd={setShownAdd}
        shownAdd={shownAdd}
        handleAdd={handleAdd}
        isNotify={notify}
        setShowToast={setShowToast}
        showToast={showToast}
        shownInputPicture={shownInputPicture}
        setShownInputPicture={setShownInputPicture}
        handleUpload={handleUpload}
      />
      {/* End Modals Add Products */}

      {/* Modals delete Product */}
      <ModalDelete
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        deleteProductHandler={deleteProductHandler}
        isNotify={notify}
        setShowToast={setShowToast}
        showToast={showToast}
      />
      {/* End Modals delete Product */}

      {/* Modals Edit Product */}
      <ModalUpdate
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        handleEdit={handleEdit}
        product={product}
        setStatus={setStatus}
        isNotify={notify}
        setShowToast={setShowToast}
        showToast={showToast}
        shownInputPicture={shownInputPicture}
        setShownInputPicture={setShownInputPicture}
      />
      {/* End Modals Edit Product */}

      {/* Main Menu Layout */}
      <DashboardLayout>
        <div className="w-full h-full p-4">
          {/* Header */}
          <MenuHeader
            submenu={listsSubmenu}
            setShowByCategory={setShowByCategory}
            setShownAdd={setShownAdd}
          />

          {/* End Header */}

          {/* Content */}
          <div
            className={`w-full h-full ${
              products?.length === 0 ||
              (filterProducts?.length === 0 && showByCategory !== '')
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
            ) : showByCategory ? (
              filterProducts?.length !== 0 || !filterProducts ? (
                filterProducts?.map((item) => (
                  <CardMenu
                    item={item}
                    priceAfterDiscount={priceAfterDiscount}
                    setShowDelete={setShowDelete}
                    setShowEdit={setShowEdit}
                    key={item._id}
                  />
                ))
              ) : (
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
                      {showByCategory} Added.
                    </span>
                  </p>
                </div>
              )
            ) : (
              products?.map((item) => (
                <CardMenu
                  item={item}
                  priceAfterDiscount={priceAfterDiscount}
                  setShowDelete={setShowDelete}
                  setShowEdit={setShowEdit}
                  key={item._id}
                />
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
