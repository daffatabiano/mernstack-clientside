import { useState } from 'react';
import { listsSubmenu } from '../../helper/constants';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';
import usePost from '../../hooks/usePost';
import { FaCheck } from 'react-icons/fa';
import useFetch from '../../hooks/useGet';
import useDelete from '../../hooks/useDelete';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CardMenu from '../../components/dashboard/card-menu';
import ModalCreate from '../../components/dashboard/modals/modal-create';
import ModalDelete from '../../components/dashboard/modals/modal-delete';
import ModalUpdate from '../../components/dashboard/modals/modal-update';
import { CiSquarePlus } from 'react-icons/ci';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);
  const { createProduct, updateProduct } = usePost();
  const { data } = useFetch('products');
  const { deleteProduct } = useDelete();
  const navigate = useNavigate();
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

  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const body = {
      category: e?.target?.category?.value,
      image: e?.target?.image?.value
        ? e?.target?.image?.value
        : '/images/empty-food.png',
      name: e?.target.name.value.toLowerCase(),
      discount: e?.target?.discount?.value,
      price: e?.target?.price?.value,
    };

    try {
      const res = await createProduct(body);
      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 0);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
        }, 2000);
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      }, 2000);
    }
  };

  const priceAfterDiscount = (price, discount) => {
    const newPrice = Number(price) - Number(price * discount) / 100;
    return Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(newPrice);
  };

  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
        });
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
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
        isShown: true,
        message: 'Discount cannot be more than 100%',
        type: 'error',
        icon: <MdError />,
      });
    }

    try {
      const res = await updateProduct(showEdit.id, body);

      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }, 2000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
    }
  };

  const filterProductsByCategory = products.filter(
    (item) => item.category === showByCategory
  );

  return (
    <>
      {/* Modals Add Products */}
      <ModalCreate
        setShownAdd={setShownAdd}
        shownAdd={shownAdd}
        handleAdd={handleAdd}
        notify={notify}
        shownInputPicture={shownInputPicture}
        setShownInputPicture={setShownInputPicture}
      />
      {/* End Modals Add Products */}

      {/* Modals delete Product */}
      <ModalDelete
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        deleteProductHandler={deleteProductHandler}
        notify={notify}
      />
      {/* End Modals delete Product */}

      {/* Modals Edit Product */}
      <ModalUpdate
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        handleEdit={handleEdit}
        product={product}
        setStatus={setStatus}
        notify={notify}
        shownInputPicture={shownInputPicture}
        setShownInputPicture={setShownInputPicture}
      />
      {/* End Modals Edit Product */}

      {/* Main Menu Layout */}
      <DashboardLayout>
        <div className="w-full h-full p-4">
          {/* Header */}
          <div className="flex items-center border-2 rounded-lg border-indigo-500">
            <div className="w-[90%] h-12 gap-4 p-2 scrollbar-header-menu flex overflow-x-auto overflow-y-hidden">
              {listsSubmenu.map((item) => (
                <h1
                  key={item.name}
                  onClick={() =>
                    setShowByCategory(item.name === 'All' ? '' : item.name)
                  }
                  className={styles.submenu}>
                  {item.name}
                </h1>
              ))}
            </div>
            <div className="w-[10%] h-12">
              <button
                type="button"
                className="w-full h-full flex justify-center items-center bg-indigo-500 text-white"
                onClick={() => setShownAdd(true)}>
                <i className="text-4xl">
                  <CiSquarePlus />
                </i>
              </button>
            </div>
          </div>
          {/* End Header */}

          {/* Content */}
          <div
            className={`w-full h-full ${
              products?.length === 0 ||
              (filterProductsByCategory?.length === 0 && showByCategory !== '')
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
              filterProductsByCategory?.length !== 0 ||
              !filterProductsByCategory ? (
                filterProductsByCategory?.map((item) => (
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
