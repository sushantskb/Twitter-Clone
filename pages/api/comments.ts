import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUserId, postId } = req.query as {
      currentUserId: string;
      postId: string;
    };
    const { body } = req.body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma?.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId,
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
