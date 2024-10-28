import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { TbMessage2Down } from 'react-icons/tb';

export const listsAside = [
  {
    name: 'User Control',
    path: '/dashboard/absence',
    icon: <FaUserCog />,
  },
  {
    name: 'Menu',
    path: '/dashboard/menu',
    icon: <RiDashboardHorizontalFill />,
  },
  {
    name: 'Order',
    path: '/dashboard/order',
    icon: <TbMessage2Down />,
  },
  {
    name: 'Analytics',
    path: '/dashboard/analytics',
    icon: <FaChartPie />,
  },
];

export const listsSubmenu = [
  {
    name: 'All',
  },
  {
    name: 'Beverages',
  },
  {
    name: 'Desserts',
  },
  {
    name: 'Foods',
  },
  {
    name: 'Appetizers',
  },
  {
    name: 'Cocktails',
  },
  {
    name: 'Drinks',
  },
  {
    name: 'Salads',
  },
  {
    name: 'Coffee',
  },
  {
    name: 'Tea',
  },
];
