export default function CardCategory(prop) {
  const { img, category, onClick } = prop;
  return (
    <div
      onClick={onClick}
      className="w-full h-40 relative rounded-lg overflow-hidden justify-center items-center transition-all duration-300 drop-shadow hover:shadow-lg hover:shadow-slate-800/50">
      <img
        src={img}
        alt=""
        className="w-full h-full object-cover object-center transition-all duration-300 grayscale hover:grayscale-0 hover:scale-110"
      />
      <p className="text-white font-bold tracking-widest text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
        {category}
      </p>
    </div>
  );
}
