import { NextRequest, NextResponse } from "next/server";
import { getTVEpisodeDetailsByIDandSeason } from "@/src/utils";
import { serverAuth } from "@/src/libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();
    const { searchParams } = new URL(req.url);
    const mediaId = searchParams.get("mediaId");
    const season = searchParams.get("season");

    if (!mediaId || !season) {
      return new NextResponse("Missing mediaId or season", { status: 400 });
    }

    const episodeDetails = await getTVEpisodeDetailsByIDandSeason(
      mediaId,
      season
    );
    return NextResponse.json(episodeDetails);
  } catch (error) {
    console.error("[EPISODE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
