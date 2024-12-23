import { AuthStaus } from '@/components/AuthStaus';
import { Menu } from '@/components/Menu';

export const Header = async () => {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-200">
      <div className="font-bold">Logo</div>
      <div>
        <AuthStaus />
      </div>
      <div>
        <Menu />
      </div>
    </header>
  );
};
