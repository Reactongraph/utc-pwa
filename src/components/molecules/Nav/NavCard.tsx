import Link from "next/link";

export default function NavCard({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg p-4 flex items-center justify-between"
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2 font-bold">{title}</span>
      </div>
      <span className="text-xl">»</span>
    </Link>
  );
}
