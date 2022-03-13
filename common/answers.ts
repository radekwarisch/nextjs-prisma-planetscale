import { ethers } from "ethers";
import contract from "./Answers.json";
import { v4 as uuidv4 } from "uuid";

declare var window;

const server = process.env.NEXT_PUBLIC_SERVER_URL;

const getContract = () => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contract.abi,
      signer
    );
  } else {
    throw new Error("Ethereum object doesn't exist!");
  }
};

export const purchaseAnswer = async (answerId) => {
  const contract = getContract();

  await contract.purchaseAnswer(answerId);
};

export const fetchAnswers = async (accountId) => {
  const contract = getContract();

  const secrets = await contract.getUserAnswers();

  const response = await fetch(`${server}/api/answers`, {
    method: "POST",
    body: JSON.stringify({
      accountId,
      secrets,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

export const addAnswer = async (questionId, answer) => {
  const contract = getContract();
  const secret = uuidv4();
  const id = Date.now();

  await contract.addAnswer(id, secret);

  const answerWithSecret = {
    ...answer,
    secret,
    id,
  };

  await fetch(`${server}/api/addAnswer`, {
    method: "POST",
    body: JSON.stringify({
      questionId,
      answer: answerWithSecret,
    }),
    headers: { "Content-Type": "application/json" },
  });
};
