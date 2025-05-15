import { NextRequest, NextResponse } from "next/server";
import { getRecommendedTVorMovies } from "@/src/utils";
import { serverAuth } from "@/src/libs/serverAuth";

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

    const recommendedMedias = await getRecommendedTVorMovies(
      mediaType,
      mediaId
    );

    return NextResponse.json(recommendedMedias);
  } catch (error) {
    console.error("[RECOMMENT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
