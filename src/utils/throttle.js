export const totalShopItems = (price, discount, quantity) => {
  const newPrice = Number(price) - Number(price * discount) / 100;
  const total = newPrice * quantity;

  return total;
};

export const formatIDR = (price) => {
  if (!price) {
    return `Rp. 0`;
  }

  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const makeId = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

export const getTableId = (url) => {
  const words = url.split('/');
  const index = words.findIndex((word) => word.toLowerCase().includes('table'));

  if (index !== -1) {
    return words.slice(index)[0];
  }
  return '';
};
