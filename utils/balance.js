import web3 from "./web3";

export const getBalance = async (walletAddress, tokenAddress) => {
  try {
    if (!walletAddress) throw new Error("Chưa kết nối ví");
    
    const balance = await web3.eth.getBalance(walletAddress);
    return web3.utils.fromWei(balance, "ether");
  } catch (error) {
    console.error("Lỗi khi lấy số dư:", error);
    return "0";
  }
};
