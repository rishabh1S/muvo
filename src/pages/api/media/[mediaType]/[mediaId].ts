import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import { getTVorMovieDetailsByID } from "@/public/utils";

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

    if (typeof mediaType !== "string" || typeof mediaId !== "string") {
      throw new Error("Invalid Media Type or Id");
    }

    if (!mediaType || !mediaId) {
      throw new Error("Missing Media Type or Id");
    }

    const medias = await getTVorMovieDetailsByID(mediaType, mediaId);

    return res.status(200).json(medias);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
