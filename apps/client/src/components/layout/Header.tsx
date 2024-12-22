export const Header = async () => {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-200">
      {/* Left: Logo */}
      <div className="font-bold">Logo</div>
      {/* Center: login or user info */}
      <div>
        {/* Placeholder for login link or user session info */}
        <a href="/login">Login</a>
      </div>
      {/* Right: hamburger menu */}
      <button className="p-2">☰</button>
    </header>
  );
};
