import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/src/libs/prismadb";
import { serverAuth } from "@/src/libs/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { mediaType, mediaId } = body;

    const existingFavorite = await prismadb.favouriteIds.findUnique({
      where: {
        id: currentUser?.id,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(currentUser);
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser?.email ?? "",
      },
      data: {
        favoriteIds: {
          create: { mediaType, mediaId },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { mediaType, mediaId } = body;

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser?.email ?? "",
      },
      data: {
        favoriteIds: {
          deleteMany: [
            {
              mediaType,
              mediaId,
            },
          ],
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[FAVORITE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
