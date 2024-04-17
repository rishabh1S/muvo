import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: ["/profiles", "/movies/:path*", "/shows/:path*", "/favlist"],
};
