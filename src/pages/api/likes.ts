import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db"; // PostgreSQL connection pool

// Load the API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
//const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:3000"; // Replace with your app's domain

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for the API key in the request headers
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate the origin or referer header
  // const origin = req.headers.origin || req.headers.referer;
  // if (!origin || !origin.startsWith(ALLOWED_ORIGIN)) {
  //   return res.status(403).json({ error: "Forbidden: Invalid origin" });
  // }

  if (req.method === "POST") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    try {
      // Check if the image already exists in the database
      const client = await pool.connect();
      const result = await client.query("SELECT count FROM likes WHERE id = $1", [id]);

      if (result.rows.length > 0) {
        // Update the like count
        await client.query("UPDATE likes SET count = count + 1 WHERE id = $1", [id]);
      } else {
        // Insert a new row for the image
        await client.query("INSERT INTO likes (id, count) VALUES ($1, $2)", [id, 1]);
      }

      client.release();
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM likes");
      client.release();
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}