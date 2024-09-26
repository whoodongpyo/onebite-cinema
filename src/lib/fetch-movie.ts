import { MovieData } from '@/types';

export default async function fetchMovie(
  id: number,
): Promise<MovieData | null> {
  const url: string = `https://onebite-cinema-api-main-vert.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
