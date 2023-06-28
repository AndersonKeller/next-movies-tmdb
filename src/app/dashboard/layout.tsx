interface Props {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    <main className="bg-white text-gray-900 px-4 rounded-2xl py-2">
      {children}
    </main>
  );
}
