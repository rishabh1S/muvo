import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authenticate",
  },
});

export const config = {
  matcher: ["/profiles/:path*", "/"],
};
