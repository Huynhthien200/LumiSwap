export const switchToSomnia = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0xc4b8", // 50312 dưới dạng hex
          chainName: "Somnia Testnet",
          nativeCurrency: {
            name: "Somnia Test Token",
            symbol: "STT",
            decimals: 18,
          },
          rpcUrls: ["https://dream-rpc.somnia.network"],
          blockExplorerUrls: ["https://shannon-explorer.somnia.network/"],
        }],
      });
      console.log("Đã chuyển sang mạng Somnia!");
    } catch (error) {
      console.error("Lỗi khi chuyển mạng:", error);
    }
  } else {
    alert("Vui lòng cài đặt MetaMask để sử dụng!");
  }
};
