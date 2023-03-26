import { fetchMovieReviews } from 'helpers/Api';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Reviews = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieReviews(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie !== null && movie.results.length > 0 ? (
        <>
          <div>
            {movie.results.map(({ id, author, content }) => (
              <li key={id}>
                <p>Author: {author}</p>
                <p>{content}</p>
              </li>
            ))}
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
