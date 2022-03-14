import { prisma } from "./_common/client";

export default async function handler(req, res) {
  const { accountId, secrets } = req.body;

  const answers = await prisma.answer.findMany({
    select: {
      id: true,
      content: true,
      questionId: true,
      secret: true,
      authorId: true,
    },
    /**
     * @description
     * Search is yet to be discovered, this approach didnt work
     */
    // where: {
    //   OR: [
    //     {
    //       secret: {
    //         search: secrets.join(" | "),
    //       },
    //     },
    //     {
    //       authorId: accountId,
    //     },
    //   ],
    // },
  });

  const parsedAnswers = answers
    .filter(({ authorId, secret }) => {
      return secrets.includes(secret); // ||  accountId === authorId
    })
    .map((answer) => ({
      ...answer,
      id: answer.id.toString(),
    }));

  res.status(200).json(parsedAnswers);
}
