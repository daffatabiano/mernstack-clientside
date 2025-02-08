import { styles } from '../../helper/styles';
import { convertBirthdate, getWorkPeriod } from '../../utils/throttle';
const PLACEHOLDER = import.meta.env.VITE_PLACEHOLDER_IMAGE;

export default function CardProfile(prop) {
  const { setShowEdit } = prop;
  const user = JSON.parse(localStorage.getItem('user'));

  const conditionalRender = (key, message) => {
    if (user[key]) {
      if (key == 'born_date') {
        return convertBirthdate(user[key]);
      }
      if (key === 'createdAt') {
        return getWorkPeriod(user[key]);
      }
      return user[key];
    }

    return (
      <span className="text-slate-400 text-sm italic font-extralight">
        {message}
      </span>
    );
  };

  return (
    <div className="p-4 w-full h-[90%] gap-4 rounded flex flex-col items-center bg-white">
      <h2 className="text-2xl text-indigo-500">Account Information</h2>

      <img
        src={
          user.image ||
          `${PLACEHOLDER}/30/dd6699/ffffff/100x100.png?text=${user.name
            ?.slice(0, 2)
            .toUpperCase()}`
        }
        alt=""
        className="w-20 h-20 rounded-full"
      />

      <div className="flex flex-col gap-4 w-full bg-slate-100 p-4 rounded">
        <p>
          <span className="font-bold text-indigo-500">NIK: </span>
          {conditionalRender('nik', 'NIK not found')}
        </p>
        <p>
          <span className="font-bold text-indigo-500">Email: </span>
          {conditionalRender('email', 'Email not found')}
        </p>
        <p>
          <span className="font-bold text-indigo-500">Age: </span>
          {conditionalRender('born_date', 'Age not found')}
        </p>
        <p>
          <span className="font-bold text-indigo-500">Gender: </span>
          {conditionalRender('gender', 'Gender not found')}
        </p>
        <p>
          <span className="font-bold text-indigo-500">Role: </span>
          {conditionalRender('role', 'Please req to manager')}
        </p>
        <p>
          <span className="font-bold text-indigo-500">Works Period: </span>
          {conditionalRender('createdAt', 'Works period not found')}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setShowEdit(true)}
        className={` ${styles.button}`}>
        Edit
      </button>
    </div>
  );
}
