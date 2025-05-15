import { NextRequest, NextResponse } from "next/server";
import { getTVorMovieDetailsByID } from "@/src/utils";

type Params = {
  params: {
    mediaType: string;
    mediaId: string;
  };
};

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { mediaType, mediaId } = params;

    if (
      !mediaType ||
      !mediaId ||
      typeof mediaType !== "string" ||
      typeof mediaId !== "string"
    ) {
      return new NextResponse("Invalid media type or ID", { status: 400 });
    }

    const media = await getTVorMovieDetailsByID(mediaType, mediaId);

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
