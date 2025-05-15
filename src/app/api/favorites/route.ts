import { NextResponse } from "next/server";
import prismadb from "@/src/libs/prismadb";
import { serverAuth } from "@/src/libs/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
    }

    const favoritedMedias = await prismadb.favouriteIds.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json(favoritedMedias);
  } catch (error) {
    console.error("[FAVORITES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
