export const Footer = async () => {
  return (
    <footer className="p-4 flex justify-between items-center bg-gray-200">
      {/* Left side: Logo */}
      <div>Logo</div>
      {/* Center: Links */}
      <div className="space-x-4">
        <a href="#">Link1</a>
        <a href="#">Link2</a>
        <a href="#">Link3</a>
      </div>
      {/* Right side: Social Icons */}
      <div className="space-x-2">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
      </div>
    </footer>
  );
};
