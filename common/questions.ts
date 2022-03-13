const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchQuestions = async () => {
  const response = await fetch(`${server}/api/questions`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

export const addQuestion = async (question) => {
  await fetch(`${server}/api/addQuestion`, {
    method: "POST",
    body: JSON.stringify(question),
    headers: { "Content-Type": "application/json" },
  });
};
