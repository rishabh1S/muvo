import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import { getTVEpisodeDetailsByIDandSeason } from "@/src/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { mediaId, season } = req.query;

    const episodeDetails = await getTVEpisodeDetailsByIDandSeason(
      mediaId as string,
      season as string
    );

    return res.status(200).json(episodeDetails);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
