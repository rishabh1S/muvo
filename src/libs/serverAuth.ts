import { getServerSession } from "next-auth/next";
import prismadb from "../libs/prismadb";
import { authOptions } from "./authOptions";

export const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};
