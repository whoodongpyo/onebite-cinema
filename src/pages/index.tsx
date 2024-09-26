import { InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';

import Head from 'next/head';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';

import styles from './index.module.css';

import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovies from '@/lib/fetch-random-movies';

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
      <div className={styles.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={styles.reco_container}>
            {recoMovies.map((movie) => (
              <MovieItem key={`reco-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={styles.all_container}>
            {allMovies.map((movie) => (
              <MovieItem key={`all-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
