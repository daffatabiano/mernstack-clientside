import { FaChartPie, FaPeopleCarry, FaUserCog } from 'react-icons/fa';
import { RiCoupon2Line, RiDashboardHorizontalFill } from 'react-icons/ri';
import { TbMessage2Down } from 'react-icons/tb';
import {
  MdOutlineAccountCircle,
  MdOutlinePeople,
  MdRestaurantMenu,
} from 'react-icons/md';
import { GrNotes } from 'react-icons/gr';

export const listsAside = [
  {
    name: 'User Control',
    icon: <FaUserCog />,
    child: [
      {
        name: 'Staff',
        path: '/admin-panel/dashboard/staff-control',
        icon: <FaPeopleCarry />,
      },
      {
        name: 'Customer',
        path: '/admin-panel/dashboard/customer-control',
        icon: <MdOutlinePeople />,
      },
    ],
  },
  {
    name: 'Menu',
    path: '/admin-panel/dashboard/menu',
    icon: <RiDashboardHorizontalFill />,
  },
  {
    name: 'Order',
    path: '/admin-panel/dashboard/order',
    icon: <TbMessage2Down />,
  },
  {
    name: 'Analytics',
    path: '/admin-panel/dashboard/analytics',
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

export const listsMenuBar = [
  {
    name: 'menu',
    link: '/menu',
    icon: <MdRestaurantMenu />,
  },
  {
    name: 'order',
    link: '/order',
    icon: <GrNotes />,
  },
  {
    name: '',
    icon: '',
  },
  {
    name: 'coupon',
    link: '/coupon',
    icon: <RiCoupon2Line />,
  },
  {
    name: 'account',
    link: '/account',
    icon: <MdOutlineAccountCircle />,
  },
];
