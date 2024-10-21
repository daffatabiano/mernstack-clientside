export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen min-w-full w-full h-full flex justify-center items-center p-2 md:p-0 bg-gray-100">
      <section className="w-full md:w-1/3 p-6 bg-white rounded-lg drop-shadow-lg shadow-slate-800">
        {children}
      </section>
    </main>
  );
}
