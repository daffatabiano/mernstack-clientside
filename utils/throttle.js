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
