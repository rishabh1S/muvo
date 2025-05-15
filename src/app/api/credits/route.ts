import { NextRequest, NextResponse } from "next/server";
import { getTVorMovieCreditsByID } from "@/src/utils";
import { serverAuth } from "@/src/libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();
    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");
    const mediaId = searchParams.get("mediaId");

    if (!mediaType || !mediaId) {
      return new NextResponse("Missing mediaType or mediaId", { status: 400 });
    }

    const credits = await getTVorMovieCreditsByID(mediaType, mediaId);

    return NextResponse.json(credits);
  } catch (error) {
    console.error("[CREDITS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
