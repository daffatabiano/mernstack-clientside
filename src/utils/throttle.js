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

export const getWorkPeriod = (createdAt) => {
  // Parse the createdAt date
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // Calculate differences in milliseconds
  const diffInMs = currentDate - createdDate;

  // Convert differences into years, months, and days
  const diffInYears = currentDate.getFullYear() - createdDate.getFullYear();
  const diffInMonths = currentDate.getMonth() - createdDate.getMonth();
  const diffInDays = currentDate.getDate() - createdDate.getDate();
  const diffInHours = currentDate.getHours() - createdDate.getHours();

  // Adjust for negative values
  let years = diffInYears;
  let months = diffInMonths;
  let days = diffInDays;
  let hours = diffInHours;

  if (diffInDays < 0) {
    months -= 1;
    days += new Date(
      createdDate.getFullYear(),
      createdDate.getMonth() + 1,
      0
    ).getDate();
  }

  if (diffInMonths < 0) {
    years -= 1;
    months += 12;
  }

  // Return the period as a readable string
  if (years > 0) {
    return `${years} years ${months} months`;
  } else if (months > 0) {
    return `${months} months ${days} days`;
  } else if (days > 0) {
    return `${days} days ${hours} hours`;
  } else {
    return `${hours} hours`;
  }
};

export const convertBirthdate = (date) => {
  const currentDate = new Date();
  const bornDate = new Date(date);

  // Pastikan hanya membandingkan tanggal tanpa memperhitungkan waktu
  currentDate.setHours(0, 0, 0, 0);
  bornDate.setHours(0, 0, 0, 0);

  // Hitung tahun dan bulan
  let ageYear = currentDate.getFullYear() - bornDate.getFullYear();
  let ageMonth = currentDate.getMonth() - bornDate.getMonth();

  // Jika bulan negatif, kurangi tahun dan tambahkan 12 ke bulan
  if (ageMonth < 0) {
    ageYear -= 1;
    ageMonth += 12;
  }

  // Periksa jika hari dalam bulan belum terlampaui
  if (currentDate.getDate() < bornDate.getDate()) {
    ageMonth -= 1;

    // Jika bulan menjadi negatif setelah mengurangi hari, kurangi tahun lagi
    if (ageMonth < 0) {
      ageYear -= 1;
      ageMonth += 12;
    }
  }

  return `${ageYear} years, ${ageMonth} months`;
};
