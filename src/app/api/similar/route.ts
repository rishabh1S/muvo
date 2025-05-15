import { NextRequest, NextResponse } from "next/server";
import { serverAuth } from "@/src/libs/serverAuth";
import { getSimilarTVorMovies } from "@/src/utils";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();

    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");
    const mediaId = searchParams.get("mediaId");

    if (!mediaType || !mediaId) {
      return NextResponse.json(
        { error: "mediaType and mediaId query parameters are required" },
        { status: 400 }
      );
    }

    const similarMedias = await getSimilarTVorMovies(mediaType, mediaId);

    return NextResponse.json(similarMedias);
  } catch (error) {
    console.error("[SIMILAR_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
