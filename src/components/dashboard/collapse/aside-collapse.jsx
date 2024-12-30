import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const CollapseMenu = (prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const { item, pathname, navigate, parent } = prop;
  const toggleCollapse = () => setIsOpen((curr) => !curr);

  return (
    <li className="w-full">
      <div
        className={`flex items-center justify-between p-4 gap-4 rounded cursor-pointer transition-all duration-100 hover:bg-slate-200 hover:scale-105`}
        onClick={toggleCollapse}>
        <div className="flex items-center gap-4">
          <i className="text-2xl">{parent.icon}</i>
          <span className="capitalize">{parent.name}</span>
        </div>
        <i className="text-2xl">
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </i>
      </div>
      {isOpen && (
        <ul className="ml-6 mt-2 space-y-2">
          {item?.map((child) => (
            <li
              key={child.name}
              className={`flex items-center gap-4 p-4 rounded cursor-pointer transition-all duration-100 ${
                pathname === child.path
                  ? 'bg-slate-200 transform scale-105'
                  : ''
              } hover:bg-slate-200 hover:scale-105`}
              onClick={() => navigate(child.path)}>
              <i className="text-2xl">{child.icon}</i>
              <Link to={child.path} className="capitalize">
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CollapseMenu;
