import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';

export default function Row({title, fetchUrl, isLargeRow, id}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

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
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={() => {
              //왼쪽에서 스크롤 되는 픽셀 수 만큼 뷰포트 안에서의 길이만큼 왼쪽으로 이동
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) =>(
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={() => {
              //오른쪽에서 스크롤 되는 픽셀 수 만큼 뷰포트 안에서의 길이만큼 오른쪽으로 이동
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {/* 클릭한 영화 정보 가져오기 */}
        {
          modalOpen && (
            <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
          )
        }
    </section>
  );
};
