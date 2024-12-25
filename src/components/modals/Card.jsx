export default function ModalCard({ children, className }) {
  return (
    <div className={`bg-white rounded-lg w-full md:w-fit p-2 ${className}`}>
      {children}
    </div>
  );
}
