import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}`
      );
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);
  
  //영화가 없으면 로딩중
  if(!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='poster'
      />
    </section>
  )
}
