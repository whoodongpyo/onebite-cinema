import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>한입시네마: 검색결과 {`'${q}'`}</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
      <div className={styles.search_container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
