import { useState } from 'react';
import DashboardLayout from './layout';

const data = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
  },
  {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
  },
  {
    id: 3,
    firstName: 'Larry',
    lastName: 'the Bird',
    username: '@twitter',
  },
];

export default function Dashboard() {
  const [isChecked, setIsChecked] = useState([]);
  const isCheckAll = isChecked.length === data.length;

  const handleChangeAll = () => {
    if (isCheckAll) {
      setIsChecked([]);
    } else {
      setIsChecked(() => data.map((item) => item.id));
    }
  };

  const handleChangeCheckbox = (id) => {
    setIsChecked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-bold text-indigo-500">Table</h1>
        <p>{isChecked.length > 0 && `${isChecked.length} of ${data.length}`}</p>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <span className="mr-2">Select All</span>
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    onChange={handleChangeAll}
                    checked={isCheckAll}
                  />
                </div>
              </th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Username</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 border-b border-gray-300">
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => handleChangeCheckbox(item.id)}
                      checked={isChecked.includes(item.id)}
                    />
                  </div>
                </td>
                <td className="p-3">{item.firstName}</td>
                <td className="p-3">{item.lastName}</td>
                <td className="p-3">{item.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <img src="/images/coming-soon.png" alt="" />
        <h1 className="text-3xl italic font-bold tracking-widest text-amber-400">
          Under Construction !
        </h1> */}
    </div>
  );
}
