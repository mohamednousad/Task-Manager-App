export default function MainLayout({ children }) {
  console.log(import.meta.env.VITE_APP_BASE_URL)
  return (
    <div className="bg-neutral-950 min-h-screen flex justify-center items-center px-4">
      <div className="bg-neutral-900 w-full max-w-md shadow-2xl rounded-2xl px-6 pt-4 flex flex-col border border-neutral-800">
        {children}
      </div>
    </div>
  );
}
