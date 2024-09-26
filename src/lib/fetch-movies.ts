import { MovieData } from '@/types';

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = 'https://onebite-cinema-api-main-vert.vercel.app/movie';

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
