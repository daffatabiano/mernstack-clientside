import { useState } from 'react';
import { listsSubmenu } from '../../helper/constants';
import { styles } from '../../helper/styles';
import DashboardLayout from './layout';

export default function MenuDashboard() {
  const [shownAdd, setShownAdd] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`w-full h-full fixed unset-0 z-20 flex justify-center items-center bg-slate-800/50 p-4 ${
          shownAdd ? 'block' : 'hidden'
        }`}>
        <div className="w-1/2 h-full p-4 bg-white rounded-lg overflow-auto">
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <label htmlFor="Name">
              Category
              <select name="category" id="category" className={styles.input}>
                {listsSubmenu.map((item) => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="image">
              Image
              <div className="w-full flex justify-center items-center">
                <img
                  src="/images/empty-food.png"
                  alt=""
                  className="w-[150px] h-[100px] object-cover rounded"
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  required
                  className={styles.input}
                />
              </div>
            </label>
            <label htmlFor="food-name">
              Food Name
              <input
                type="text"
                name="foodname"
                id="food-name"
                required
                className={styles.input}
              />
            </label>
            <label htmlFor="price">
              Price
              <input
                type="number"
                name="price"
                id="price"
                required
                className={styles.input}
              />
            </label>
            <label htmlFor="discount">
              Discount
              <input
                type="number"
                name="discount"
                id="discount"
                className={styles.input}
              />
            </label>
            <div className="w-full flex gap-2">
              <button
                type="button"
                className={styles.button}
                onClick={() => setShownAdd(false)}>
                Close
              </button>
              <button type="submit" className={styles.button}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <DashboardLayout>
        <div className="w-full h-full p-4">
          <div className="flex gap-2 items-center px-2">
            <div className="w-[90%] h-12 gap-4 flex overflow-x-auto overflow-y-hidden">
              {listsSubmenu.map((item) => (
                <h1 key={item.name} className={styles.submenu}>
                  {item.name}
                </h1>
              ))}
            </div>
            <div className="w-[10%]">
              <button
                type="button"
                className={styles.button}
                onClick={() => setShownAdd(true)}>
                Add +
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
