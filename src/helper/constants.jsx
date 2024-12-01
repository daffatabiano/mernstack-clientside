import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { RiCoupon2Line, RiDashboardHorizontalFill } from 'react-icons/ri';
import { TbMessage2Down } from 'react-icons/tb';
import { MdOutlineAccountCircle, MdRestaurantMenu } from 'react-icons/md';
import { GrNotes } from 'react-icons/gr';

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
    name: 'Burger' + "'s",
    image: '/images/burger-bg.jpg',
  },
  {
    name: 'Salad' + "'s",
    image: '/images/salads-bg.jpg',
  },
  {
    name: 'Coffee' + "'s",
    image: '/images/coffee-bg.png',
  },
  {
    name: 'Tea' + "'s",
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
