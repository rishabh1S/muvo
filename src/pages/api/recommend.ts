import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import { getRecommendedTVorMovies } from "@/src/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { mediaType, mediaId } = req.query;

    const recommendedMedias = await getRecommendedTVorMovies(
      mediaType as string,
      mediaId as string
    );

    return res.status(200).json(recommendedMedias);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
