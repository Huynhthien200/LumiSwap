import Header from "../components/Header";
import SwapForm from "../components/SwapForm";

export default function Swap() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Header />
      <div className="mt-10">
        <SwapForm />
      </div>
    </div>
  );
}
