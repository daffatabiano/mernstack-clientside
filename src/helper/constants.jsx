import { FaChartPie } from 'react-icons/fa';
import { RiDashboardHorizontalFill, RiHome6Line } from 'react-icons/ri';
import { TbMessage2Down } from 'react-icons/tb';

export const listsAside = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <RiHome6Line />,
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
