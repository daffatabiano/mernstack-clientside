import { Toaster } from '../../notif/Toaster';

export default function ModalDelete(prop) {
  const {
    showDelete,
    setShowDelete,
    deleteProductHandler,
    showToast,
    setShowToast,
    isNotify,
  } = prop;

  return (
    <div
      className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
        showDelete.isShown ? 'block' : 'hidden'
      }`}>
      <Toaster
        showToast={showToast}
        setShowToast={setShowToast}
        isStatus={isNotify}
      />
      <div className="p-4 flex flex-col gap-2 bg-white rounded-lg overflow-auto">
        <h1>Are you sure you want to delete this product?</h1>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setShowDelete({ isShown: false })}
            className="px-4 py-2 bg-indigo-500 text-white rounded">
            Cancel
          </button>
          <button
            onClick={() => deleteProductHandler(showDelete.id)}
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
