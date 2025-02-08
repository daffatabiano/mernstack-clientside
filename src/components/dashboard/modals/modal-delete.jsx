import { Modal } from 'antd';
import { useProductDeleteMutation } from '../../../redux/reducers/api/deleteReducers';
import { useGetAllProductsQuery } from '../../../redux/reducers/api/fetchReducers';

export default function ModalDelete(prop) {
  const { showDelete, setShowDelete } = prop;
  const [productDelete, { isLoading, isSuccess }] = useProductDeleteMutation();
  const { refetch } = useGetAllProductsQuery({
    refetchOnMountOrArgChange: true,
  });

  const deleteProductHandler = async (id) => {
    try {
      await productDelete(id).unwrap();
      setShowDelete({ isShown: false });
      await refetch();
    } catch (err) {
      console.log(err);
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
            disabled={isLoading}
            onClick={() => setShowDelete({ isShown: false })}
            className="px-4 py-2 bg-indigo-500 text-white rounded">
            Cancel
          </button>
          <button
            onClick={() => deleteProductHandler(showDelete.id)}
            type="button"
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
