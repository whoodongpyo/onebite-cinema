import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from './[id].module.css';

import fetchMovies from '@/lib/fetch-movies';
import fetchMovie from '@/lib/fetch-movie';

export const getStaticPaths = async () => {
  const allMovies = await fetchMovies();
  const movieIds = allMovies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths: movieIds,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const movie = await fetchMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
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
        <div>...로딩중입니다...</div>
      </>
    );
  }

  if (!movie) return '문제가 발생했습니다. 다시 시도해주세요.';

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.container}>
        <div
          className={styles.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>
        <div className={styles.info_container}>
          <div>
            <h2>{title}</h2>
            <div>
              {releaseDate} / {genres.join(', ')} / {runtime}분
            </div>
            <div>{company}</div>
          </div>
          <div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
