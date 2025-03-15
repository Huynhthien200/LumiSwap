import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Chào mừng đến với Somnia Swap</h1>
      <p className="text-lg mt-4 text-gray-400">
        Swap token dễ dàng trên mạng lưới Somnia
      </p>
      <button
        onClick={() => router.push("/swap")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-800"
      >
        Launch DApp
      </button>
    </div>
  );
};

export default LandingPage;
