import { ReactNode, useEffect, useState } from 'react';

import styles from './search.module.css';

import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';

import fetchMovies from '@/lib/fetch-movies';
import { useRouter } from 'next/router';
import { MovieData } from '@/types';

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async () => {
    const searchedMovies = await fetchMovies(q as string);
    setMovies(searchedMovies);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div className={styles.search_container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
