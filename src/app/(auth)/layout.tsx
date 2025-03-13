export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="min-h-[100vh] flex items-end justify-center bg-[url('/images/default_splash.png')] bg-contain bg-center bg-no-repeat">
        {children}
      </div>
    </div>
  );
}
