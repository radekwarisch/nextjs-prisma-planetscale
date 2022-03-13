const { expect } = require("chai");

const main = async () => {
  const answerContractFactory = await hre.ethers.getContractFactory("Answers");
  const answerContract = await answerContractFactory.deploy();

  await answerContract.deployed();

  const [_, randomPerson] = await hre.ethers.getSigners();

  /**
   * @description
   * Answers are added to contract
   */

  await answerContract.addAnswer(123, "222");
  await answerContract.addAnswer(456, "333");

  /**
   * @description
   * User initially has no answers access
   */

  await answerContract.connect(randomPerson).getUserAnswers();

  expect(await answerContract.connect(randomPerson).getUserAnswers()).to.eql(
    []
  );

  /**
   * @description
   * User is purchasing answers
   */

  await answerContract.connect(randomPerson).purchaseAnswer(456);
  await answerContract.connect(randomPerson).purchaseAnswer(123);

  const newAnswers = await answerContract
    .connect(randomPerson)
    .getUserAnswers();

  /**
   * @description
   * User should have access to both answer secrets
   */

  expect(newAnswers[0]).to.equal("333");
  expect(newAnswers[1]).to.equal("222");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
