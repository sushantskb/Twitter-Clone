import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function editHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {

    const { name, username, bio, profileImage, coverImage, userId } = req.body;

    if (!name || !username) {
      throw new Error("Missing Fields");
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
