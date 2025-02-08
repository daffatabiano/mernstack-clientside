import { useState } from 'react';
import { listsSubmenu } from '../../../helper/constants';
import DashboardLayout from '../layout';
import usePost from '../../../hooks/usePost';
import useFetch from '../../../hooks/useGet';
import useDelete from '../../../hooks/useDelete';
import CardMenu from '../../../components/dashboard/card-menu';
import ModalCreate from '../../../components/dashboard/modals/modal-create';
import ModalDelete from '../../../components/dashboard/modals/modal-delete';
import ModalUpdate from '../../../components/dashboard/modals/modal-update';
import MenuHeader from '../../../components/dashboard/MenuHeader';
import { priceAfterDiscount } from '../../../helper/helper';
import useUpload from '../../../hooks/useUpload';
import { useSearchParams } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../../redux/reducers/api/fetchReducers';
import Search from 'antd/es/input/Search';
import { Button, Pagination } from 'antd';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);
  const { updateProduct } = usePost();
  const { deleteProduct } = useDelete();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showByCategory, setShowByCategory] = useState('');
  const { data, isLoading, isError, isSuccess } = useGetAllProductsQuery({
    page: page,
    limit: pageSize,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'createdAt',
  });
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

  console.log(shownAdd);

  return (
    <>
      {/* Main Menu Layout */}
      <div className="w-full h-full">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 w-full p-2 ">
          <div className="flex justify-between gap-4 items-center w-full">
            <Search
              allowClear
              onSearch={(value) => setSearchParams({ search: value })}
              placeholder="Search Products"
              size="large"
              style={{
                borderRadius: '50%',
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />

            <Button
              size="large"
              htmlType="button"
              className="rounded-lg bg-middle-dark text-middle-light"
              onClick={() => setShownAdd(true)}>
              + New Products
            </Button>
          </div>

          <MenuHeader
            submenu={listsSubmenu}
            setShowByCategory={setShowByCategory}
            setShownAdd={setShownAdd}
          />
        </div>

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
                  className="text-base-dark hover:underline cursor-pointer">
                  Added.
                </span>
              </p>
            </div>
          ) : (
            products?.map((item) => (
              <CardMenu
                item={item}
                priceAfterDiscount={priceAfterDiscount}
                setShowDelete={setShowDelete}
                setShowEdit={setShowEdit}
                key={item._id || Date.now()}
              />
            ))
          )}
        </div>
        <Pagination
          style={{ display: 'flex', justifyContent: 'end' }}
          onChange={(page, sizePage) => {
            setPage(page);
            setPageSize(sizePage);
          }}
          showSizeChanger
          pageSize={pageSize}
          total={products?.length}
        />
        {/* End Content */}
      </div>
      {/* End Menu Layout */}
      {/* Modals Add Products */}
      <ModalCreate
        setShownAdd={setShownAdd}
        shownAdd={shownAdd}
        handleUpload={handleUpload}
      />
      {/* End Modals Add Products */}

      {/* Modals delete Product */}
      <ModalDelete showDelete={showDelete} setShowDelete={setShowDelete} />
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
    </>
  );
}
