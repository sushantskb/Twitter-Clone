import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUserId } = req.query;

    if (!postId || postId !== "string") {
      throw new Error("Invalid Id");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid Id");
    }

    let updatedLikedIds = [...(post.likedIds || [])];
    if (req.method === "POST") {
      updatedLikedIds.push(currentUserId);
    }
    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUserId
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log("Error", error);
    return res.status(400).end();
  }
}
