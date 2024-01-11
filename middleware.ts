import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: [
    "/profiles",
    "/",
    "/movies",
    "/series",
    "/search/:path*",
    "/favlist",
    "/streammovie/:path*",
    "/streamtv/:path*",
  ],
};
