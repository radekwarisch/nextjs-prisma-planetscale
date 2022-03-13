const main = async () => {
  const answersContractFactory = await hre.ethers.getContractFactory("Answers");
  const answersContract = await answersContractFactory.deploy();

  await answersContract.deployed();

  console.log("Answers address: ", answersContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
