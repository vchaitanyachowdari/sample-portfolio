import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

const MAX_ATTEMPTS = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;
    const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

    if (!correctPassword) {
      console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Parse cookies to track attempts
    const cookies = cookie.parse(req.headers.cookie || "");
    const failedAttempts = parseInt(cookies.failedAttempts || "0", 10);

    if (failedAttempts >= MAX_ATTEMPTS) {
      return res
        .status(429)
        .json({ message: "No tries left. Please try again after 1 hr." });
    }

    if (password === correctPassword) {
      // Reset failed attempts on success
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("authToken", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      // Reset failed attempts cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("failedAttempts", "0", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json({ success: true });
    } else {
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("failedAttempts", newFailedAttempts.toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        })
      );

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        return res
          .status(429)
          .json({ message: "No tries left. Please try again after 1 hr." });
      }

      return res
        .status(401)
        .json({
          message:
            "Incorrect password ! " +
            (MAX_ATTEMPTS - newFailedAttempts) +
            " tries left.",
        });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
