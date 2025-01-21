import { styles } from '../../../helper/styles';

export default function ModalEditProfile(prop) {
  const {
    showEdit,
    updateNotif,
    handleEdit,
    setShowCropModal,
    image,
    showCropModal,
    setShowEdit,
  } = prop;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
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
          <div
            onClick={() => setShowCropModal({ ...showCropModal, shown: true })}>
            <img
              src={user.image}
              className="w-32 h-32 my-4 mx-auto rounded-full"
              alt=""
            />
          </div>

          <label htmlFor="NIK">
            N.I.K
            <input
              type="text"
              name="nik"
              placeholder="N.I.K"
              className={styles.input}
              defaultValue={user.NIK}
            />
          </label>
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
              </select>
            </label>
            <label htmlFor="age">
              Birthdate
              <input
                type="date"
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
  );
}
