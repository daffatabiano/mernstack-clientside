export const priceAfterDiscount = (price, discount) => {
  const newPrice = Number(price) - Number(price * discount) / 100;
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(newPrice);
};
