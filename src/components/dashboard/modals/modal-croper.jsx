import { Cropper } from 'react-cropper';
import { styles } from '../../../helper/styles';

export default function ModalCropper(prop) {
  const {
    showCropModal,
    updateNotif,
    getCropData,
    image,
    onChange,
    cropperRef,
    setShowCropModal,
  } = prop;
  return (
    <div
      className={`bg-slate-800/50 h-screen w-full flex justify-center items-center fixed top-0 right-0 left-0 z-50 ${
        showCropModal.shown ? 'block' : 'hidden'
      }`}>
      <div
        className={`absolute top-5 right-5 bg-white p-4 rounded border-b-8 ${
          updateNotif.type === 'error' ? 'border-red-500' : 'border-green-500'
        } ${updateNotif.isShown ? 'block' : 'hidden'}`}>
        <div
          className={`flex items-center gap-4 ${
            updateNotif.type === 'error' ? 'text-red-500' : 'text-green-500'
          }`}>
          {updateNotif.icon}
          <p>{updateNotif.message}</p>
        </div>
      </div>
      <div className="w-1/3 max-h-[90%] overflow-y-auto bg-white rounded-lg p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold pt-12">Select Photo</h1>
        <form onSubmit={getCropData}>
          {!image ? (
            <input
              type="file"
              className="p-2 rounded w-full"
              onChange={onChange}
            />
          ) : (
            <div style={{ position: 'relative' }}>
              <Cropper
                style={{ height: 400, width: '100%' }}
                preview=".img-preview"
                src={image}
                ref={cropperRef}
                viewMode={1}
                aspectRatio={1} // Keep the crop area square
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              className={styles.button}
              type="button"
              onClick={() =>
                setShowCropModal({ ...showCropModal, shown: false })
              }>
              Close
            </button>
            {image && (
              <button className={styles.button} type="submit">
                Crop
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
