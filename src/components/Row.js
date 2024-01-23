import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({title, fetchUrl, isLargeRow, id}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    //axios를 이용해 비동기 요청 import 주의!
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };
  
  //클릭 한 영화 정보 가져오기 선언
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        1378: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        998: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        625: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        0: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },

      }}
      >
        <div id={id} className='row__posters'>
          {movies.map((movie) =>(
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                loading='lazy'
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {/* 클릭한 영화 정보 가져오기 */}
        {
          modalOpen && (
            <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
          )
        }
    </section>
  );
};
