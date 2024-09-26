import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import styles from './index.module.css';
import movies from '@/mock/dummy.json';
import MovieItem from '@/components/movie-item';

export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={styles.reco_container}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`reco-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={styles.all_container}>
          {movies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
