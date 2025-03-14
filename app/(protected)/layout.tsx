import Navbar from "./settings/_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-sky-300 to-indigo-700">
      <Navbar />
      {children}
    </div>
  );
}
