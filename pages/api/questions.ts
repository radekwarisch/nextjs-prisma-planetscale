import { prisma } from "./_common/client";

export default async function handler(req, res) {
  const questions = await prisma.question.findMany({
    include: {
      answers: {
        select: {
          authorId: true,
          score: true,
          createdAt: true,
          updatedAt: true,
          id: true,
        },
      },
    },
  });

  const blockedByDefault = questions.map((question) => ({
    ...question,
    answers: question.answers.map((answer) => ({ ...answer, blocked: true })),
  }));

  res.status(200).json(blockedByDefault);
}
