import { NextApiRequest, NextApiResponse } from "next";

export default async function notificationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.query as { userId: string };
    console.log("user", userId);
    

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const notiofications = await prisma?.noitification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma?.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json(notiofications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
