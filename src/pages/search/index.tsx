import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import styles from './search.module.css';
import movies from '@/mock/dummy.json';
import MovieItem from '@/components/movie-item';

export default function Page() {
  const router = useRouter();
  const q = (router.query.q as string) || '';

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className={styles.search_container}>
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
