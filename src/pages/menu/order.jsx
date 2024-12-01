import { useState } from 'react';
import LayoutMenu from './layout';
import { useSelector } from 'react-redux';

export default function Order(prop) {
  const [toCategoryMenu, setToCategoryMenu] = useState({
    closeCategory: true,
    menu: {},
  });
  const [showDrawer, setShowDrawer] = useState(false);
  const dataOrder = useSelector((state) => state?.cart?.cart);
  const totalQuantity = dataOrder?.reduce(
    (total, item) => Number(total) + Number(item.quantity),
    0
  );

  return (
    <LayoutMenu
      toCategoryMenu={toCategoryMenu}
      setShowDrawer={setShowDrawer}
      showDrawer={showDrawer}
      totalQuantity={totalQuantity}>
      <div>this is jak mania order</div>
    </LayoutMenu>
  );
}
