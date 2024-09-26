import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';

import styles from './search.module.css';

import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';

import fetchMovies from '@/lib/fetch-movies';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const q = context.query.q;

  const movies = await fetchMovies(q as string);

  return {
    props: { movies },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
