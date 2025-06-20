import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    const isOnline = response.ok ;
    res.status(200).json({ status: isOnline ? "Online" : "Offline" });
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    res.status(500).json({ status: "Offline" });
  }
}