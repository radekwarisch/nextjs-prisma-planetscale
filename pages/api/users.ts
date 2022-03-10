// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "./_common/client";

export default async function handler(req, res) {
  const users = await prisma.user.findMany();

  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({
      status: 200,
      data: { user },
    });
  } else {
    res.status(200).json(users);
  }
}
