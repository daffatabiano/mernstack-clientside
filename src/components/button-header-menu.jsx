export default function ButtonHeaderMenu(prop) {
  const { title, onClick, active } = prop;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white font-bold uppercase text-indigo-500 tracking-wider rounded-full py-2 px-4 ${
        !active
          ? 'scale-75 translate-y-2 opacity-70'
          : 'scale-100 translate-y-0 opacity-100'
      }`}>
      {title}
    </button>
  );
}
