import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CDC_API_URL = 'https://data.cdc.gov/resource/xkkf-xrst.json';  // Mental health dataset example

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch limited results from CDC (adjust params as needed)
    const response = await axios.get(CDC_API_URL, {
      params: {
        '$limit': 10,
      },
    });

    const data = response.data;  // Real-time data from CDC
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching CDC data:', error);
    res.status(500).json({ error: 'Failed to fetch CDC data.' });
  }
}
