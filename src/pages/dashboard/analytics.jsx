import DashboardLayout from './layout';

export default function AnalyticsDashboard() {
  return (
    <DashboardLayout>
      <div className="w-full h-full p-4 flex flex-col justify-center items-center">
        <img src="/images/coming-soon.png" alt="" />
        <h1 className="text-3xl italic font-bold tracking-widest text-amber-400">
          Under Construction !
        </h1>
      </div>
    </DashboardLayout>
  );
}
