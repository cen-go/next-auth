export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-br from-sky-300 to-indigo-700">
      {children}
    </div>
  )
}