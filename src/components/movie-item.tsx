import { MovieData } from '@/types';
import Link from 'next/link';
import styles from './movie-item.module.css';

export default function MovieItem({
  id,
  title,
  releaseDate,
  company,
  genres,
  subTitle,
  description,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={styles.container}>
      <img src={posterImgUrl} />
    </Link>
  );
}
