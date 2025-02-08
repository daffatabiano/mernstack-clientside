import { useState } from 'react';
import useDelete from '../../../hooks/useDelete';
import { Toaster } from '../../notif/Toaster';
import useFetch from '../../../hooks/useGet';
import { Modal } from 'antd';

export default function ModalDelete(prop) {
  const { showDelete, setShowDelete } = prop;
  const { deleteProduct } = useDelete();
  const { loading, refetch } = useFetch('products');
  const [notify, setNotify] = useState({
    type: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);

  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        setShowToast(true);
        setNotify({
          message: res.data.message,
          type: 'success',
        });
        setShowDelete({
          isShown: false,
        });
        await refetch();
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
        message: err?.response?.data?.message || err?.message || err,
        type: 'error',
      });
    }
  };

  return (
    <Modal
      open={showDelete.isShown}
      onCancel={() => setShowDelete({ isShown: false })}
      footer={null}
      centered>
      <div className="flex flex-col gap-2 bg-white rounded-lg overflow-auto">
        <h1>Are you sure you want to delete this product?</h1>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowDelete({ isShown: false })}
            className="px-4 py-2 bg-indigo-500 text-white rounded">
            Cancel
          </button>
          <button
            onClick={() => deleteProductHandler(showDelete.id)}
            type="button"
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
