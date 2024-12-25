import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LayoutMenu from './layout';
import { listsSubmenu } from '../../helper/constants';
import CardCategory from '../../components/card-category';
import ButtonHeaderMenu from '../../components/button-header-menu';
import useFetch from '../../hooks/useGet';
import CardMenu from '../../components/card-menu';
import { totalShopItems } from '../../utils/throttle';
import ModalMenu from '../../components/modals/ModalMenu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalWrapper from '../../components/modals/Wrapper';
import ModalCard from '../../components/modals/Card';
import ModalPhoneInput from '../../components/modals/ModalPhoneInput';

export default function Menu() {
  const [toCategoryMenu, setToCategoryMenu] = useState({
    closeCategory: false,
    menu: {},
  });
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get('tableId');
  const { data } = useFetch('products');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const products = data?.data;
  const [showDrawer, setShowDrawer] = useState(false);
  const [onModals, setOnModals] = useState({
    isShown: false,
    data: {},
  });
  const dataOrder = useSelector((state) => state?.cart?.cart);
  const navigate = useNavigate();
  const tokenCust = localStorage.getItem('tokenCust');

  if (!tokenCust && tableId) {
    localStorage.setItem('tableId', tableId);
    return navigate('/otp');
  }

  useEffect(() => {
    if (dataOrder) {
      localStorage.setItem('cart', JSON.stringify(dataOrder));
    }
  }, [dataOrder]);

  const productsByFilter = products?.filter((item) => {
    if (toCategoryMenu.menu.name === 'All' || toCategoryMenu.menu.name === '') {
      return item;
    } else {
      return item.category === toCategoryMenu.menu.name;
    }
  });

  const totalPrice = dataOrder?.map((item) => {
    const total = totalShopItems(item.price, item.discount, item.quantity);

    return total;
  });

  const totalQuantity = dataOrder?.reduce(
    (total, item) => Number(total) + Number(item.quantity),
    0
  );

  useEffect(() => {
    const snapScriptUrl = import.meta.env.VITE_SNAP_SCRIPT_URL;

    let script = document.createElement('script');
    script.src = snapScriptUrl;

    const midTransClientKey = import.meta.env.CLIENT_KEY;
    script.setAttribute('data-client-key', midTransClientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <LayoutMenu
      toCategoryMenu={toCategoryMenu}
      setShowDrawer={setShowDrawer}
      showDrawer={showDrawer}
      dataOrder={dataOrder}
      totalQuantity={totalQuantity}
      totalPrice={totalPrice}>
      {/* Modals Order */}

      {onModals?.isShown && (
        <ModalMenu
          onModals={onModals}
          setOnModals={setOnModals}
          setNotes={setNotes}
          notes={notes}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}

      <div
        className={`w-full h-full p-4 flex flex-col md:w-1/3 gap-2 justify-center items-center ${
          toCategoryMenu.closeCategory && 'hidden'
        }`}>
        {listsSubmenu?.map((item, index) => (
          <CardCategory
            onClick={() => {
              setToCategoryMenu({
                ...toCategoryMenu,
                closeCategory: !toCategoryMenu.closeCategory,
                menu: item,
              });
            }}
            img={item.image}
            category={item?.name}
            key={index}
          />
        ))}
      </div>

      {toCategoryMenu?.closeCategory && (
        <div className="fixed top-2 w-full px-4 h-12 flex justify-center z-10 overflow-x-auto scrollbar-header-menu">
          {listsSubmenu.map((item, i) => (
            <ButtonHeaderMenu
              key={i}
              title={item?.name}
              active={item.name === toCategoryMenu.menu.name}
              onClick={() => {
                setToCategoryMenu({
                  ...toCategoryMenu,
                  menu: {
                    ...item,
                    image: item.image,
                    nama: item.name === 'All' ? '' : item.name,
                  },
                });
              }}
            />
          ))}
        </div>
      )}

      {toCategoryMenu?.closeCategory && (
        <>
          <img
            src={toCategoryMenu.menu.image}
            alt={`image-of-${toCategoryMenu.menu.name}`}
            className="w-full h-1/5 md:h-1/3 md:w-2/3  opacity-50 object-cover object-center fixed top-0 left-0 md:left-1/2 md:-translate-x-1/2 rounded-b-lg"
          />

          <div className="w-[90%] md:w-1/3 min-h-[90%] md:gap-4 h-full p-2 rounded-lg mt-32 bg-white/30 backdrop-blur-lg overflow-y-auto absolute flex flex-col gap-2 shadow-lg">
            {productsByFilter?.length !== 0 || !productsByFilter ? (
              productsByFilter?.map((product) => (
                <CardMenu
                  key={product._id}
                  image={product.image}
                  title={product.name}
                  price={product.price}
                  discount={product.discount}
                  onClick={() => {
                    setOnModals({
                      isShown: true,
                      data: product,
                    });
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col h-full w-full justify-center items-center">
                <img src="/images/empty-products.png" alt="" />
                <h1 className="text-2xl text-center font-bold text-indigo-500">
                  {toCategoryMenu?.menu.name} is currently Unavailable
                </h1>
              </div>
            )}
          </div>
        </>
      )}
    </LayoutMenu>
  );
}
