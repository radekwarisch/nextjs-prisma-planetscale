import { prisma } from "./_common/client";

export default async function handler(req, res) {
  const { questionId, answer } = req.body;

  const question = await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      answers: {
        create: answer,
      },
    },
  });

  res.status(200).json({
    status: 200,
    data: { answer, question },
  });
}
