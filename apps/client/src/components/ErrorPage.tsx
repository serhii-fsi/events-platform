export const ErrorPage = ({ message }: { message: string }) => {
  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">Error</h1>
      <p className="text-text3 text-center">{message}</p>
    </div>
  );
};
