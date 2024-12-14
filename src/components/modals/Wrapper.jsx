export default function ModalWrapper({ children }) {
  return (
    <div className="fixed p-2 bg-slate-800/40 flex justify-center items-center w-full h-full min-h-screen min-w-screen z-[100]">
      {children}
    </div>
  );
}
