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
    image:
      'https://wallpapers.com/images/featured/food-4k-1pf6px6ryqfjtnyr.jpg',
  },
  {
    name: 'Burgers',
    image: '/images/burger-bg.jpg',
  },
  {
    name: 'Salads',
    image: '/images/salads-bg.jpg',
  },
  {
    name: 'Coffee',
    image: '/images/coffee-bg.png',
  },
  {
    name: 'Tea',
    image: '/images/tea-bg.jpg',
  },
];

export const listsOrder = [
  {
    name: 'All',
  },
  {
    name: 'Pending',
  },
  {
    name: 'Completed',
  },
  {
    name: 'Cancelled',
  },
];
