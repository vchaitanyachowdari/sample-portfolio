import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from the external API
    const response = await fetch("https://stats.maheshbabu11.dev/stats");

    // Check if the response is OK
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data from the external API" });
    }

    // Parse the response data
    const data = await response.json();

    // Return the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from the external API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}