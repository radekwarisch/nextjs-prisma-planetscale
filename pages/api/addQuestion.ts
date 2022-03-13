import { prisma } from "./_common/client";

export default async function handler(req, res) {
  const question = await prisma.question.create({
    data: req.body,
  });
  res.status(200).json({
    status: 200,
    data: { question },
  });
}
