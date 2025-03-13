export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-16 w-full">{children}</div>;
}
