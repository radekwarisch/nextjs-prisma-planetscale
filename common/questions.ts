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

export const enrichAnswersWithUnlockedPerQuestion =
  (unlockedAnswers) => (curr) =>
    curr.map((question) => {
      const unlockedAnswersPerQuestion = unlockedAnswers.filter(
        ({ questionId }) => questionId === question.id
      );

      if (unlockedAnswersPerQuestion.length === 0) {
        return question;
      }

      const resolvedAnswers = question.answers.map((answer) => {
        const matchedUnlocked = unlockedAnswersPerQuestion.find(
          ({ id }) => id === answer.id
        );

        return matchedUnlocked
          ? {
              ...answer,
              ...matchedUnlocked,
              blocked: false,
            }
          : answer;
      });

      return {
        ...question,
        answers: resolvedAnswers,
      };
    });
