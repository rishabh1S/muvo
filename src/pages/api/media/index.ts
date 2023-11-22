import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/src/libs/serverAuth";
import {
  getPopularMedias,
  getTopratedMedias,
  getTrendingMedias,
} from "@/public/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);
    const { mediaType, type } = req.query;

    let media;
    if (type === "trending") {
      media = await getTrendingMedias(mediaType as string);
    } else if (type === "popular") {
      media = await getPopularMedias(mediaType as string);
    } else if (type === "toprated") {
      media = await getTopratedMedias(mediaType as string);
    } else {
      return res.status(400).end();
    }

    return res.status(200).json(media);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
