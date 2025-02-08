import { useRef, useState } from 'react';
import DashboardLayout from './layout';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import ModalEditProfile from '../../components/dashboard/modals/modal-edit-profile';
import ModalCropper from '../../components/dashboard/modals/modal-croper';
import CardProfile from '../../components/dashboard/card-profile';
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;

const reusable = {
  styles: {
    card_information: 'w-full bg-white p-2 h-full rounded flex flex-col ',
  },
};

export default function ProfileDashboard() {
  const url = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [showEdit, setShowEdit] = useState(false);
  const [updateNotif, setUpdateNotif] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const cropperRef = useRef(null);
  const [showCropModal, setShowCropModal] = useState({
    shown: false,
    section: 1,
  });

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = (e) => {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    setShowCropModal({ ...showCropModal, shown: false, section: 1 });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      NIK: e.target.nik.value,
      name: e.target.name.value,
      email: e.target.email.value,
      born_date: e.target.age.value,
      gender: e.target.gender.value,
      image: image
        ? cropData
        : `${PLACEHOLDER_IMAGE}/30/dd6699/ffffff/100x100.png?text=${user.name
            ?.slice(0, 2)
            .toUpperCase()}`,
    };

    if (!body) {
      return setUpdateNotif({
        isShown: true,
        message: 'No data provided',
        type: 'error',
        icon: <MdErrorOutline />,
      });
    }

    try {
      const res = await axios.put(`${url}/user/${user._id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setUpdateNotif({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });

        setTimeout(() => {
          setShowEdit(false);
          setTimeout(() => {
            setUpdateNotif({
              isShown: false,
              message: '',
              type: '',
              icon: '',
            });
          }, 1000);
        }, 2000);
      } else {
        setUpdateNotif({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdErrorOutline />,
        });
        setTimeout(() => {
          setUpdateNotif({
            isShown: false,
            message: '',
            type: '',
            icon: '',
          });
        }, 2000);
      }
    } catch (error) {
      setUpdateNotif({
        isShown: true,
        message: error.response.data.message,
        type: 'error',
        icon: <MdErrorOutline />,
      });
      setTimeout(() => {
        setUpdateNotif({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      }, 2000);
    }
  };

  return (
    <>
      <ModalEditProfile
        showEdit={showEdit}
        updateNotif={updateNotif}
        handleEdit={handleEdit}
        setShowCropModal={setShowCropModal}
        image={image}
        showCropModal={showCropModal}
        setShowEdit={setShowEdit}
      />

      <ModalCropper
        setShowCropModal={setShowCropModal}
        showCropModal={showCropModal}
        updateNotif={updateNotif}
        getCropData={getCropData}
        image={image}
        onChange={onChange}
        cropperRef={cropperRef}
      />

      <section className="p-4 h-full w-full flex gap-5 items-center">
        <div className="w-1/3">
          <h1 className="text-2xl font-bold capitalize pb-2">
            Hello,{' '}
            <i className="text-indigo-500 capitalize">
              {user.name.split(' ')[0]}
            </i>{' '}
            Keep Spirit!
          </h1>

          <CardProfile setShowEdit={setShowEdit} />
        </div>
        <div className="flex flex-col gap-4 w-2/3">
          <h1 className="text-2xl font-bold text-end uppercase">Performance</h1>

          <div className="flex flex-col gap-4 h-full">
            <div className={reusable.styles.card_information}>
              <h1 className="text-2xl">Attendance</h1>
              <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                <img
                  src="/images/attendance.png"
                  className="w-24 h-24"
                  alt=""
                />
                <p className=""> You don&apos;t have any attendance yet,</p>
              </div>
            </div>
            <div className={reusable.styles.card_information}>
              <h1 className="text-2xl">Working Hours</h1>
              <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                <img
                  src="/images/working-hours.png"
                  className="w-24 h-24"
                  alt=""
                />
                <p className=""> You don&apos;t have any working hours yet,</p>
              </div>
            </div>
            <div className={reusable.styles.card_information}>
              <h1 className="text-2xl">Achievements</h1>
              <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                <img
                  src="/images/achievements.png"
                  className="w-24 h-24"
                  alt=""
                />
                <p className="">
                  {' '}
                  You have not achieved any achievements yet,
                  <span className="text-indigo-500"> keep working hard</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
