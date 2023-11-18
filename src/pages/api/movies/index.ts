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
    const { type } = req.query;

    let movies;
    if (type === "trending") {
      movies = await getTrendingMedias("movie");
    } else if (type === "popular") {
      movies = await getPopularMedias("movie");
    } else if (type === "toprated") {
      movies = await getTopratedMedias("movie");
    } else {
      return res.status(400).end();
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
