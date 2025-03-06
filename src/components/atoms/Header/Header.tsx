interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="py-4 text-center w-full">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;
