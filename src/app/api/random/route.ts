import { NextRequest, NextResponse } from "next/server";
import { getTrendingMedias } from "@/src/utils";
import { serverAuth } from "@/src/libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();
    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");

    if (!mediaType) {
      return NextResponse.json(
        { error: "mediaType query parameter is required" },
        { status: 400 }
      );
    }

    const trendingMedias = await getTrendingMedias(mediaType);
    if (!trendingMedias || trendingMedias.length === 0) {
      return NextResponse.json(
        { error: "No trending media found." },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(Math.random() * trendingMedias.length);
    const randomMovie = trendingMedias[randomIndex];

    return NextResponse.json(randomMovie);
  } catch (error) {
    console.error("[RANDOM_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
