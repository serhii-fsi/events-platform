import { AuthStaus } from '@/components/AuthStaus';

export const Header = async () => {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-200">
      {/* Left: Logo */}
      <div className="font-bold">Logo</div>
      {/* Center: login or user info */}
      <div>
        <AuthStaus />
      </div>
      {/* Right: hamburger menu */}
      <button className="p-2">☰</button>
    </header>
  );
};
