import { useState } from 'react';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfileDashboard() {
  const url = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

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

    try {
      const res = await axios.put(`${url}/user/${user._id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setShowEdit(false);
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
        <div className="w-1/3 max-h-[90%] overflow-auto bg-white rounded-lg p-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
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
              <button
                className={styles.button}
                type="submit"
                onClick={() => setShowEdit(!showEdit)}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <DashboardLayout>
        <section className="p-4 h-full w-full">
          <h1 className="text-2xl font-bold capitalize pb-2">
            Hello, {user.name} Welcome Back !
          </h1>
          <div className="p-4 w-80 gap-4 rounded flex flex-col items-center bg-white">
            <h2 className="text-2xl">Account Information</h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="w-20 h-20 rounded-full"
            />

            <div className="flex flex-col gap-2  bg-slate-100 p-2">
              <p>
                <span className="font-bold">Email: </span>
                {user.email}
              </p>
              <p>
                <span className="font-bold">Age: </span>
                {user.age}
              </p>
              <p>
                <span className="font-bold">Gender: </span>
                {user.gender}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className={` ${styles.button}`}>
              Edit
            </button>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
