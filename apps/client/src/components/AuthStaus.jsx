import Link from 'next/link';

export const AuthStaus = async () => {
  return (
    <div className="flex gap-4">
      <div>
        <Link href="/profile">Profile</Link>
      </div>
      <div>
        {/* <img src={session.user.picture} alt={session.user.name} />
          <h2>{session.user.name}</h2>
          <p>{session.user.email}</p> */}
      </div>
      <div>
        <a href="http://localhost:3001/login">Login</a>
      </div>
      <div>
        <a href="http://localhost:3001/logout">Logout</a>
      </div>
    </div>
  );
};
