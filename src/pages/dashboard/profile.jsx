import { useState } from 'react';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';

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
  const navigate = useNavigate();
  const [updateNotif, setUpdateNotif] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });

  if (!user) return window.location.replace('/login');

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
    };

    if (body.password !== body.confirmPassword) {
      return setUpdateNotif({
        isShown: true,
        message: 'Passwords do not match',
        type: 'error',
        icon: <MdErrorOutline />,
      });
    }

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`bg-slate-800/50 h-screen w-full flex justify-center items-center fixed top-0 right-0 left-0 z-50 ${
          showEdit ? 'block' : 'hidden'
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
          <h1 className="text-2xl font-bold pt-12">Edit Profile</h1>
          <form onSubmit={handleEdit}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-32 h-32 my-4 mx-auto rounded-full"
              alt=""
            />

            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={styles.input}
                defaultValue={user.name}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="********"
                className={styles.input}
              />
            </label>
            <label htmlFor="confirmpassword">
              Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className={styles.input}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                placeholder="Email"
                className={styles.input}
                defaultValue={user.email}
              />
            </label>
            <div className="flex gap-2">
              <label htmlFor="gender" className="flex flex-col w-full">
                Gender
                <select name="gender" id="" className={styles.input}>
                  <option value="male" selected={user.gender === 'male'}>
                    Male
                  </option>
                  <option value="female" selected={user.gender !== 'male'}>
                    Female
                  </option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label htmlFor="age">
                Age
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className={styles.input}
                  defaultValue={user.age}
                />
              </label>
            </div>
            <div className="flex gap-2">
              <button
                className={styles.button}
                type="button"
                onClick={() => setShowEdit(!showEdit)}>
                Close
              </button>
              <button className={styles.button} type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <DashboardLayout>
        <section className="p-4 h-full w-full flex gap-5 items-center">
          <div className="w-1/3">
            <h1 className="text-2xl font-bold capitalize pb-2">
              Hello,{' '}
              <i className="text-indigo-500 capitalize">
                {user.name.split(' ')[0]}
              </i>{' '}
              Keep Spirit!
            </h1>
            <div className="p-4 w-full h-[90%] gap-4 rounded flex flex-col items-center bg-white">
              <h2 className="text-2xl text-indigo-500">Account Information</h2>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                className="w-20 h-20 rounded-full"
              />

              <div className="flex flex-col gap-4 w-full bg-slate-100 p-4 rounded">
                <p>
                  <span className="font-bold text-indigo-500">NIK: </span>
                  {'1234567890'}
                </p>
                <p>
                  <span className="font-bold text-indigo-500">Email: </span>
                  {user.email}
                </p>
                <p>
                  <span className="font-bold text-indigo-500">Age: </span>
                  {user.age}
                </p>
                <p>
                  <span className="font-bold text-indigo-500">Gender: </span>
                  {user.gender}
                </p>
                <p>
                  <span className="font-bold text-indigo-500">Role: </span>
                  {'Cashier'}
                </p>
                <p>
                  <span className="font-bold text-indigo-500">
                    Works Period:{' '}
                  </span>
                  {'1 year'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEdit(true)}
                className={` ${styles.button}`}>
                Edit
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-2/3">
            <h1 className="text-2xl font-bold text-end uppercase">
              Performance
            </h1>

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
                  <p className="">
                    {' '}
                    You don&apos;t have any working hours yet,
                  </p>
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
      </DashboardLayout>
    </>
  );
}
