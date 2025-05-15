import { serverAuth } from "@/src/libs/serverAuth";
import {
  getPopularMedias,
  getTopratedMedias,
  getTrendingMedias,
  getTVorMovieDetailsByID,
} from "@/src/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();
    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");
    const type = searchParams.get("type");
    const mediaId = searchParams.get("mediaId");

    if (mediaId) {
      if (!mediaType || !mediaId) {
        return new NextResponse("Invalid media type or ID", { status: 400 });
      }
      const media = await getTVorMovieDetailsByID(mediaType, mediaId);
      return NextResponse.json(media);
    }

    if (!type) {
      return new NextResponse("Missing type parameter", { status: 400 });
    }

    let media;
    switch (type) {
      case "trending":
        media = await getTrendingMedias(mediaType!);
        break;
      case "popular":
        media = await getPopularMedias(mediaType!);
        break;
      case "toprated":
        media = await getTopratedMedias(mediaType!);
        break;
      default:
        return new NextResponse("Invalid type", { status: 400 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
