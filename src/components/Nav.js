import React, { useEffect, useState } from 'react'
import "./Nav.css"
import {useNavigate } from 'react-router-dom';

export default function Nav() {
  //스크롤 시에 NavBar 색깔 변경하기
  const [show, setShow] = useState(false);
  //검색창 옮기기 함수
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  //검색페이지에서 SerachTerm 가져오기

  useEffect(()=> {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return() => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //검색창에 입력한 내용으로 이동하기
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        className='nav__logo'
        //이미지를 클릭하면 다시 로딩 하게끔
        onClick={() => window.location.reload()}
      />
      {/* 중앙 검색창  */}
      <input
        value={searchValue}
        onChange={handleChange}
        className='nav__input'
        type='text'
        placeholder='영화를 검색해주세요.'
      />

      <img
        alt='User logged'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        className='nav__avatar'
      />
    </nav>
  );
};