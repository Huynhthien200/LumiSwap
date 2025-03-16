module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy LUMI Token
  const lumi = await deploy('LumiToken', {
    from: deployer,
    args: [],
    log: true
  });

  // Deploy Swap Contract
  const wstt = "0x..."; // Wrapped STT Address
  await deploy('LumiSwap', {
    from: deployer,
    args: [wstt],
    log: true
  });
};
