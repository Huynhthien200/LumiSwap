const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-5 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Somnia Swap</h1>
      <ConnectWallet />
    </header>
  );
};
export default Header;
