import { useState } from 'react';
import LayoutMenu from './layout';

export default function Account() {
  const [toCategoryMenu, setToCategoryMenu] = useState({
    closeCategory: true,
    menu: {},
  });

  return (
    <LayoutMenu toCategoryMenu={toCategoryMenu}>
      <div>this is jak mania account</div>
    </LayoutMenu>
  );
}
