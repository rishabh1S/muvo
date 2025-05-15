import {
  getPopularMedias,
  getTopratedMedias,
  getTrendingMedias,
} from "@/src/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");
    const type = searchParams.get("type");

    let media;
    if (type === "trending") {
      media = await getTrendingMedias(mediaType!);
    } else if (type === "popular") {
      media = await getPopularMedias(mediaType!);
    } else if (type === "toprated") {
      media = await getTopratedMedias(mediaType!);
    } else {
      return new NextResponse("Invalid type", { status: 400 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
