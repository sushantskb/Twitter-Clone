import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }
    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.status(200).json(post);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(400).end();
  }
}
